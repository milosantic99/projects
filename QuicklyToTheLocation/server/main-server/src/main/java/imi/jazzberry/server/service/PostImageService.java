package imi.jazzberry.server.service;

import imi.jazzberry.server.dto.ImageDto;
import imi.jazzberry.server.model.PostImage;
import imi.jazzberry.server.repository.PostImageRepository;
import imi.jazzberry.server.util.ImageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostImageService {

    private final PostImageRepository postImageRepository;
    @Autowired
    public PostImageService(PostImageRepository postImageRepository) {
        this.postImageRepository = postImageRepository;
    }

    public List<Integer> uploadImages(MultipartFile[] files, Long postId) throws IOException {
        List<Integer> indexesOfFilesWithInvalidContentType = new ArrayList<>(files.length);

        for (int i = 0; i < files.length; i++) {
            String contentType = files[i].getContentType();

            if(! "image/png".equals(contentType)
            && ! "image/jpeg".equals(contentType)
            && ! "image/webp".equals(contentType)
            && ! "image/jpg".equals(contentType))
                indexesOfFilesWithInvalidContentType.add(i);
        }

        if(indexesOfFilesWithInvalidContentType.size() != 0)
            return indexesOfFilesWithInvalidContentType;

        for (MultipartFile file : files) {
            String name = file.getOriginalFilename();

            if (name == null)
                name = "";

            int lastIndexOf = name.lastIndexOf(".");
            if (lastIndexOf != -1)
                name = name.substring(0, lastIndexOf);

            postImageRepository.save(PostImage.builder()
                    .name(name)
                    .type(file.getContentType())
                    .image(ImageUtility.compressImage(file.getBytes()))
                    .postId(postId)
                    .build());
        }

        return indexesOfFilesWithInvalidContentType;
    }

    public ResponseEntity<List<ImageDto>> getImages(Long postId) {
        List<PostImage> postImages = postImageRepository.findAllByPostId(postId);

        if(postImages.isEmpty())
            postImages = List.of();

        List<ImageDto> postImagesDto = postImages.stream()
                .map(postImg -> {
                    var decompressedImg = ImageUtility.decompressImage(postImg.getImage());
                    postImg.setImage(decompressedImg);

                    return new ImageDto(decompressedImg, postImg.getType(), postImg.getName());
                })
                .toList();

        return ResponseEntity.ok()
                .body(postImagesDto);
    }
}
