package imi.jazzberry.server.service;

import imi.jazzberry.server.dto.ImageDto;
import imi.jazzberry.server.enums.ResponseEntityEnum;
import imi.jazzberry.server.model.User;
import imi.jazzberry.server.model.UserImage;
import imi.jazzberry.server.repository.UserImageRepository;
import imi.jazzberry.server.repository.UserRepository;
import imi.jazzberry.server.util.ImageUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
public class UserImageService {

    private final UserImageRepository userImageRepository;
    private final UserRepository userRepository;
    @Autowired
    public UserImageService(UserImageRepository userImageRepository, UserRepository userRepository) {
        this.userImageRepository = userImageRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntityEnum uploadImage(MultipartFile file, String username) throws IOException {

        String contentType = file.getContentType();
        String fileName = file.getOriginalFilename();

        if(fileName == null)
            fileName = "";

        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf != -1)
            fileName = fileName.substring(0, lastIndexOf);

        boolean isContentTypeValid = true;
        if(! "image/png".equals(contentType)
        && ! "image/jpeg".equals(contentType)
        && ! "image/webp".equals(contentType)
        && ! "image/jpg".equals(contentType))
            isContentTypeValid = false;

        if(! isContentTypeValid)
            return ResponseEntityEnum.NOT_PICTURE;

        UserImage userImage = userImageRepository.save(UserImage.builder()
                .name(fileName)
                .type(contentType)
                .image(ImageUtility.compressImage(file.getBytes()))
                .build());

        User user = userRepository.findUserByUsername(username);

        Optional<UserImage> optionalUserImage = Optional.ofNullable(
                userImageRepository.findByUserImageId(user.getImageId()));

        if(optionalUserImage.isPresent())
            userImageRepository.deleteById(user.getImageId());

        user.setImageId(userImage.getId());

        userRepository.save(user);

        return ResponseEntityEnum.PICTURE;
    }

    public ImageDto getImage(String username) {
        User user = userRepository.findUserByUsername(username);

        if(user == null)
            return null;

        Long imgId = user.getImageId();

        if(imgId == null)
            return new ImageDto();

        Optional<UserImage> dbImage = userImageRepository.findById(imgId);

        if(dbImage.isEmpty())
            return new ImageDto();

        return new ImageDto(
                ImageUtility.decompressImage(dbImage.get().getImage()),
                dbImage.get().getType(),
                dbImage.get().getName());
    }
}
