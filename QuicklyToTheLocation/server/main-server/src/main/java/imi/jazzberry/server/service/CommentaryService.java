package imi.jazzberry.server.service;

import imi.jazzberry.server.dto.CommentaryUpdateDto;
import imi.jazzberry.server.enums.NotificationEnum;
import imi.jazzberry.server.model.Commentary;
import imi.jazzberry.server.model.CommentarySecondLevel;
import imi.jazzberry.server.model.Notification;
import imi.jazzberry.server.model.Post;
import imi.jazzberry.server.repository.CommentaryRepository;
import imi.jazzberry.server.repository.CommentarySecondLevelRepository;
import imi.jazzberry.server.repository.NotificationRepository;
import imi.jazzberry.server.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentaryService {
    private final CommentaryRepository commentaryRepository;
    private final PostRepository postRepository;
    private final CommentarySecondLevelRepository commentarySecondLevelRepository;
    private final NotificationRepository notificationRepository;

    @Autowired
    public CommentaryService(CommentaryRepository commentaryRepository,
                             PostRepository postRepository,
                             CommentarySecondLevelRepository commentarySecondLevelRepository,
                             NotificationRepository notificationRepository){
        this.commentaryRepository = commentaryRepository;
        this.postRepository = postRepository;
        this.commentarySecondLevelRepository = commentarySecondLevelRepository;
        this.notificationRepository = notificationRepository;
    }
    public List<Commentary> getCommentariesForPost(long postId) {
        return commentaryRepository.findByPostId(postId);
    }

    public void commentPost(long postId, String content, long userId) {
        Commentary commentary = new Commentary(postId, userId, content);
        Post post = postRepository.findPostById(postId);

        post.setCommentaryCounter(post.getCommentaryCounter()+1);
        postRepository.save(post);

        commentaryRepository.save(commentary);

        Notification notification = new Notification(
                NotificationEnum.COMMENT,
                LocalDateTime.now(),
                post.getUserId(),
                userId,
                postId,
                false);

        notificationRepository.save(notification);
    }

    public void commentSecondLevel(long postId, long commentaryId, String content, long userId) {
        CommentarySecondLevel commentarySecondLevel = new CommentarySecondLevel(postId, commentaryId, content, userId);
        commentarySecondLevelRepository.save(commentarySecondLevel);

        Commentary commentary = commentaryRepository.findByCommentaryId(commentaryId);

        Notification notification = new Notification(
                NotificationEnum.COMMENT,
                LocalDateTime.now(),
                commentary.getUserId(),
                userId,
                postId,
                false);

        notificationRepository.save(notification);
    }

    public List<CommentarySecondLevel> getSecondLevelComment(long postId, long commentaryId) {
        return commentarySecondLevelRepository.findByPostIdAndCommentaryId(postId,commentaryId);
    }

    public void updateComment(CommentaryUpdateDto commentaryUpdateDto) {
        Commentary commentary = commentaryRepository.findByCommentaryId(commentaryUpdateDto.getCommentaryId());

        commentary.setContent(commentaryUpdateDto.getContent());

        commentaryRepository.save(commentary);
    }

    public void updateSecondLevelComment(CommentaryUpdateDto commentaryUpdateDto) {
        CommentarySecondLevel commentarySecondLevel = commentarySecondLevelRepository.findBySecondCommentaryId(commentaryUpdateDto.getCommentaryId());

        commentarySecondLevel.setContent(commentaryUpdateDto.getContent());

        commentarySecondLevelRepository.save(commentarySecondLevel);
    }

    public void deleteComment(long commentaryId) {
        Commentary commentary = commentaryRepository.findByCommentaryId(commentaryId);

        Post post = postRepository.findPostById(commentary.getPostId());

        post.setCommentaryCounter(post.getCommentaryCounter()-1);
        postRepository.save(post);

        commentarySecondLevelRepository.deleteByCommentaryId(commentaryId);

        commentaryRepository.deleteByCommentaryId(commentaryId);
    }

    public void deleteSecondLevelComment(long commentaryId) {
        commentarySecondLevelRepository.deleteById(commentaryId);
    }
}
