# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.1.1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v2.1.0...v2.1.1) (2022-12-13)


### Bug Fixes

* **main:** handle null case in getImage (UserController) ([cdcc583](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/cdcc5839ec0876fe229bc75a5bdab16b28c089e4))
* **main:** return dto instead of post model in getPost (PostController) ([bdbba81](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/bdbba814929b6410926236c8cda512ce331de5d9))

## [2.1.0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v2.0.1...v2.1.0) (2022-12-13)


### Features

* **main:** add (dis)like status into post dto ([eaf738e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/eaf738effb0f76a3ac58fd47df1e5ac204d116fd))
* **main:** add endpoint for checking follow status ([377209a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/377209ab27fcfd3c896788d1f005f4f708882c35))
* **main:** add follow status in user dto ([7da9e0c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/7da9e0c9fc91512a20c2dea070f9b657a779bd81))

### [2.0.1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v2.0.0...v2.0.1) (2022-12-13)


### Features

* after user is deleted, delete everything connected with him ([06e05c2](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/06e05c2a1b211d476908fbf47bcda0f7427a9b99))


### Bug Fixes

* fix like and dislike notification ([ea6a5ae](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ea6a5ae82e3ba22354ba15f6d1557ed458a32cc5))
* **main:** change 'seen' endpoint method to patch ([11126d5](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/11126d582426cabd34dfbb885a59c49142237245))
* **main:** fix parsing error in getImage (UserController) handler ([58c89b9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/58c89b9069a0842bac0b1cb488ed36d2c0e74448))
* **main:** fix serialization problem with notifDto ([362c0ed](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/362c0ededef4f0fd5c83772a444f5d5a784b9924))
* **main:** rename old field name in notif query ([8aaccbe](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/8aaccbe315c236f9ee7caadfaf5a968ed0e7c5cd))
* **main:** return notif dto instead of the model & rename fields ([c398b5e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c398b5e357589adae1dfeab6baaecbaaf55cd96c))

## [2.0.0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.5...v2.0.0) (2022-12-12)


### ⚠ BREAKING CHANGES

* fix user and post update
* **main:** change base path for 2. lvl controller
* **main:** instead of image byte array APIs return ImageDto
* add new api for location
* minor fixes and add new enums for notifications
* update user controller
* add notifications for follow, like, dislike and comment
* add update post and delete post also add feed
* add new filter for locations and refactor creating location
* add new api for commentaries and second level commentaries

### Features

* add new api for commentaries and second level commentaries ([9b425fc](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9b425fc3f5afa09a8c434192112213557c4fcfb6))
* add new api for location ([0f59370](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0f593706770f0c0683f26cfab6a93bb5c463e0ba))
* add new filter for locations and refactor creating location ([020d90f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/020d90f71ff482098a3641c4943e4628c0b77576))
* add notifications for follow, like, dislike and comment ([76a0ea5](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/76a0ea52a3582f360cb750d987127d9380656be3))
* add update post and delete post also add feed ([bb64abd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/bb64abd13e468c6ddceb4ae5c35060c57f26a5c9))
* **main:** add ferching user by id by refact current api ([11057fc](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/11057fc21cec94612bd817627e00c82860b6e523))
* **main:** change return format & improve OpenApi page for image APIs ([e516696](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e5166968b2d5136873c627667dab90a6aa1273b7))
* update user controller ([9eeef54](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9eeef54e33ac883bb61e45fc36f49dd1b699fbdc))


### Bug Fixes

* commentary counter fix ([20577dd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/20577dd43c1b66886b3910a4c155bbc10ef189b1))
* delete old profile picture ([874d156](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/874d156b5f9d1505fa545eedd37e8e2c2af68e6d))
* fix user and post update ([eb981dd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/eb981dd83a581eabd014255fc0a1b2f8b31850a6))
* **main:** change base path for 2. lvl controller ([6ba2a50](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6ba2a50c1da78e2a4cc4ff9fa4e5bc6dfb2948ca))
* **main:** fix bugs in posts filter ([a247bad](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/a247badac4fdf57efb6ed3df8ed290b4417a4977))
* **main:** fix string related problems in PostImageService & remove unused repo ([36f0567](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/36f05674139854224d896707765780db338a74b0))
* **main:** make some code parts null-safe ([53775b2](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/53775b2a1c5e3008cf151333f217ba06fe031811))
* **main:** remove extra endpoint for fetching user data ([885da0f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/885da0f92911e3e5f46f0463b8f20f6ef25bc831)), closes [#33](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/33)
* **main:** return empty array instead of bad req msg ([c4a28f0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c4a28f0bb59ad9985de6b00dbe5f236faa0879c9)), closes [#31](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/31)
* **main:** return empty list instead of null when returning list type ([0df5f51](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0df5f51c1f7f6a5612bff2a49b7950016c46e02f))
* **main:** rewrite location filter service ([35772b1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/35772b18c4d4747a10c731d2a254f1683b377a6f)), closes [#38](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/38)
* **main:** use postDate for sorting (feed service) ([56ab362](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/56ab3629b215767b9c4de27cc9276c093cf2f178)), closes [#35](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/35)
* minor changes for user registration and update post ([ea6b3a8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ea6b3a8944b22e213305fd885819b5377bd9f88d))
* minor fixes and add new enums for notifications ([b4ca0d2](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b4ca0d2f2d566fabc2027e72dbc1458926c6475d))
* upload user profile image ([b7bcb78](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b7bcb78785f6383f19767bf7e512d1553c5896d1))

### [1.3.5](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.4...v1.3.5) (2022-12-06)


### BREAKING CHANGES

* **main:** make changing username impossible

### Bug Fixes

* **main:** make changing username impossible ([1e4abc8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1e4abc8067ede7ce95827706b456e8484a268369))

### [1.3.4](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.3...v1.3.4) (2022-12-06) 
 
 
### Bug Fixes 
 
* **main:** fix error handling in user controller ([1ad9b00](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1ad9b0022b1df332566380d2de50a9a11ca9b353)) 
* **main:** remove extra str in Post filter and refactor services ([9fcaa65](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9fcaa65d8f1cb958c337a15c1a3906f6ad56eeec)) 
 
### [1.3.3](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.2...v1.3.3) (2022-12-06) 
 
 
### Bug Fixes 
 
* **main:** delete user: handle case when password is not valid & add ... ([83e7106](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/83e7106ad67ee1594b366bce7e25d47912ecf6d8))

### [1.3.2](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.0...v1.3.2) (2022-12-05)


### Bug Fixes

* creat standard role fix ([3c0c44a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/3c0c44a317b05c7da3a386b0f39c77b37dbf6d20))
* **main:** improve error handling in filters ([1827402](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/18274024ef71212192e35af392aeb5a67056541e))
* refresh token duration->365 days ([3b06bce](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/3b06bce7655e159a13f5220c5a0acb68d7ee8d9a))

### [1.3.1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.3.0...v1.3.1) (2022-12-05)


### Bug Fixes

* creat standard role fix ([3c0c44a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/3c0c44a317b05c7da3a386b0f39c77b37dbf6d20))

## [1.3.0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.1.1...v1.3.0) (2022-12-04)


### ⚠ BREAKING CHANGES

* add like and dislike counter(rating for posts)
* add commentaries and second level commentaries
* user followings api and some minor changes
* add commentaries on post
* add following and unfollowing users
* add location db and location controller
* **main:** - PUT `posts/like` changed to `{postId}/like`
- PUT `posts/dislike` change to `{postId}/dislike
* **main:** - GET posts/{location}/{startDate}/{endDate}/{userId}/{sort}/{sortOrder}
  change localtion to locationId and it's type to long
* **main:** - GET `users/image/{name}` changed to `users/{username}/image`
- POST `upload/image` changed to `{username}/image`
* **main:** - GET `posts/image/{name}` changed to `posts/{postId}/images`
- POST `{postId}/upload/image` changed to `posts/{postId}/images`
* password regex
* minor fixes
* user dont need to send userid for like or dislike
* password must have more than 10 characters
* create admin and developer role and user
* add sort posts
* change from PUT to POST
* post image upload and get
* fix post filter by start date, end date, user id and location
* fix filter posts
* add post image
* user profile picture fix some bugs
* user profile image fix some bugs
* fix like and dislike post and removed post images for now
* post like and dislike functionality
* user profile image upload and get

### Features

* add commentaries and second level commentaries ([e9998d8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e9998d866737cc08d9197b09552b48f827d0549e))
* add commentaries on post ([58ce451](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/58ce451e3980578522e50eeecaf98d70ebf7cd62))
* add following and unfollowing users ([986b2da](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/986b2da3745fd1800ee2b4be4d7f0f4036189fa9))
* add image name to user column ([fece083](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/fece083c57e95521c7f0713f6aafcb71fcb56a20))
* add like and dislike counter(rating for posts) ([3844312](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/384431242efd21c07e1e39a132c81b244dbd17cd))
* add location db and location controller ([9ecc24c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9ecc24c47ac37c49db6c3dab7a7265c7d4fd3281))
* add new columns in user table(posts,followers,description,reputation) ([594ab58](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/594ab58ec28cb3388f30cde8d564a2b4cd869c86))
* add post image ([06f245e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/06f245eef953e911476ca7cf7eab2a03467bd5b8))
* Add response entity to every api and it now returns error 400+ with message ([b76108e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b76108e33ca519699c4c190083475d98a3bf844f))
* add sort posts ([111fff9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/111fff951e1d6722209ffcc6d25d49eb4ccf6abd))
* add table post and other api-s connected with post but user can many times like and dislike post ([64e7fbb](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/64e7fbb2d61e9a34b56b6757079adae831b23086))
* add time for posted picture ([60414bb](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/60414bb4b502676b4eda07216f3d28e82ff58d60))
* add user image unfunctional ([851f008](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/851f008d57d77e10760269efc3849cf379e3e1c3))
* change from PUT to POST ([e10594f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e10594ff01f7a76c8386465a0444310895f34b0b))
* create admin and developer role and user ([475f452](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/475f452cb8c38eb4c8ddf783c41485440b09da9d))
* **main:** add support for bulk upload ([1ac025b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1ac025b9b2d1ed5d857edc3e93130b70191e8683))
* password must have more than 10 characters ([3793ce9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/3793ce97a48ca665d074ffbaf9f7ec1e32fff7af))
* password regex ([074e8e1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/074e8e1dbbd9b36f6ebbedab11c4f86542927df1))
* post image upload and get ([be539be](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/be539beb099deb7e3957bf71400fed984f339b09))
* post like and dislike functionality ([9ac241b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9ac241bb420375086c5a566109f046e79e69598f))
* user dont need to send userid for like or dislike ([f9d8ac0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f9d8ac0bc7a81a3fba4fb979a2e8ca9a540b29e9))
* user followings api and some minor changes ([4f67b0f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4f67b0f51b247ac971c09edb73069a4b06f99f8f))
* user profile image upload and get ([120d664](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/120d664c1f8e7495fe3943fd9d9ced7b727fd85a))


### Bug Fixes

* fix email regex and fix password for admin and dev user ([a8da9d4](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/a8da9d4c4312f7672b6ec9cb62c64b2307f2f1c2))
* fix filter posts ([4b5eeb6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4b5eeb646ed9fc52cda23cccfbbd761e780989a4))
* fix like and dislike post and removed post images for now ([1d30d87](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1d30d87f22ec52756d81dc7668c2d36cd987d660))
* fix post filter by start date, end date, user id and location ([2445887](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2445887db3303b384307868e08b6e994cdadf6c4))
* fix update user and add email regex ([a52aa47](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/a52aa474684c397cafbb5b14b54908849608ccca))
* fux update user wehere update delete all roles ([d4b03e9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d4b03e9bd0a675626c29bbaa71b919a97f26818f))
* image name is now saved in post ([9b33f71](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9b33f715dd4f6616ed7fe8f62d08a21917694ce1))
* **main:regex:** add 0 as valid character in regex ([2d4abac](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2d4abac175b0790cf160497d17a20506ac289de2))
* **main:** add auth annotation on every api ([63d2e68](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/63d2e6811230d7dac81f5e940c8e5ade5ac2d5c3))
* **main:** change & delete some model members ([63d1a3b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/63d1a3b13281a3b58e740a318f56a3f58293044e))
* **main:** fix erros that result in status 403 ([518f46a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/518f46a2a9959ee380487674a0cdf025b4080fef))
* **main:** fix image api in user controller ([416138a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/416138a0c207834bd7bbbfb0f5d2c22921c5b330))
* **main:** fix problem with url-unsafe password on server side ([1772fa2](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1772fa2df4a00e176a3a78d5d1d31dda4120df77)), closes [#30](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/30)
* **main:** fix response msgs, enums and pw check ([0fe3e09](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0fe3e09ee978019342c34197ef022f169b7a191e))
* **main:** recive postId from path ([6049ff7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6049ff7566f4e73410d65cff7777d62f7257de05))
* minor changes ([4144678](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/414467876f14a48dcdf8d8d5e797e9aa1b1f40c6))
* minor fix ([2d35a69](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2d35a69cb1a040ba15783185fafb7c55ada8559e))
* minor fixes ([b5d7d7e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b5d7d7ef1be8ae0ff36d5499524bba600fc6125f))
* removed time for created picture for now and add sort by commentaries counter ([c3b9857](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c3b985703bfd01e97b6a389b6f344b9f86831f02))
* some bug fixes ([4ace3d1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4ace3d1f0045e8a8421217632596f63377e0489b))
* some minor changes ([a2bae89](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/a2bae899f6a6479bf7b37b2be0f430dd0da517a3))
* update user and user password(user must send old and new password) ([2dea089](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2dea08999a537eca03ba95e3f1773630f0dcb13f))
* user can only upload pictures ([194fa66](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/194fa66ac80c015b0645412f192de8c91b722eaf))
* user id ([6730091](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6730091f7919b4669598a5d042914862def5cb15))
* user profile image fix some bugs ([cc4a95c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/cc4a95cada76f2e876998b7ebece363810824a6e))
* user profile picture fix some bugs ([8f24d33](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/8f24d334dde350b99fc6dcddbbc422e2566f9915))

## [1.2.0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/compare/v1.1.1...v1.2.0) (2022-12-04)


### ⚠ BREAKING CHANGES

* add location db and location controller
* **main:** - PUT `posts/like` changed to `{postId}/like`
- PUT `posts/dislike` change to `{postId}/dislike
* **main:** - GET posts/{location}/{startDate}/{endDate}/{userId}/{sort}/{sortOrder}
  change localtion to locationId and it's type to long
* **main:** - GET `users/image/{name}` changed to `users/{username}/image`
- POST `upload/image` changed to `{username}/image`
* **main:** - GET `posts/image/{name}` changed to `posts/{postId}/images`
- POST `{postId}/upload/image` changed to `posts/{postId}/images`
* password regex
* minor fixes
* user dont need to send userid for like or dislike
* password must have more than 10 characters
* create admin and developer role and user
* add sort posts
* change from PUT to POST
* post image upload and get
* fix post filter by start date, end date, user id and location
* fix filter posts
* add post image
* user profile picture fix some bugs
* user profile image fix some bugs
* fix like and dislike post and removed post images for now
* post like and dislike functionality
* user profile image upload and get

### Features

* add image name to user column ([fece083](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/fece083c57e95521c7f0713f6aafcb71fcb56a20))
* add location db and location controller ([9ecc24c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9ecc24c47ac37c49db6c3dab7a7265c7d4fd3281))
* add new columns in user table(posts,followers,description,reputation) ([594ab58](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/594ab58ec28cb3388f30cde8d564a2b4cd869c86))
* add post image ([06f245e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/06f245eef953e911476ca7cf7eab2a03467bd5b8))
* Add response entity to every api and it now returns error 400+ with message ([b76108e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b76108e33ca519699c4c190083475d98a3bf844f))
* add sort posts ([111fff9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/111fff951e1d6722209ffcc6d25d49eb4ccf6abd))
* add table post and other api-s connected with post but user can many times like and dislike post ([64e7fbb](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/64e7fbb2d61e9a34b56b6757079adae831b23086))
* add user image unfunctional ([851f008](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/851f008d57d77e10760269efc3849cf379e3e1c3))
* change from PUT to POST ([e10594f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e10594ff01f7a76c8386465a0444310895f34b0b))
* create admin and developer role and user ([475f452](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/475f452cb8c38eb4c8ddf783c41485440b09da9d))
* **main:** add support for bulk upload ([1ac025b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1ac025b9b2d1ed5d857edc3e93130b70191e8683))
* password must have more than 10 characters ([3793ce9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/3793ce97a48ca665d074ffbaf9f7ec1e32fff7af))
* password regex ([074e8e1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/074e8e1dbbd9b36f6ebbedab11c4f86542927df1))
* post image upload and get ([be539be](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/be539beb099deb7e3957bf71400fed984f339b09))
* post like and dislike functionality ([9ac241b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9ac241bb420375086c5a566109f046e79e69598f))
* user dont need to send userid for like or dislike ([f9d8ac0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f9d8ac0bc7a81a3fba4fb979a2e8ca9a540b29e9))
* user profile image upload and get ([120d664](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/120d664c1f8e7495fe3943fd9d9ced7b727fd85a))


### Bug Fixes

* fix filter posts ([4b5eeb6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4b5eeb646ed9fc52cda23cccfbbd761e780989a4))
* fix like and dislike post and removed post images for now ([1d30d87](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1d30d87f22ec52756d81dc7668c2d36cd987d660))
* fix post filter by start date, end date, user id and location ([2445887](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2445887db3303b384307868e08b6e994cdadf6c4))
* fux update user wehere update delete all roles ([d4b03e9](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d4b03e9bd0a675626c29bbaa71b919a97f26818f))
* image name is now saved in post ([9b33f71](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/9b33f715dd4f6616ed7fe8f62d08a21917694ce1))
* **main:** add auth annotation on every api ([63d2e68](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/63d2e6811230d7dac81f5e940c8e5ade5ac2d5c3))
* **main:** change & delete some model members ([63d1a3b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/63d1a3b13281a3b58e740a318f56a3f58293044e))
* **main:** fix erros that result in status 403 ([518f46a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/518f46a2a9959ee380487674a0cdf025b4080fef))
* **main:** fix image api in user controller ([416138a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/416138a0c207834bd7bbbfb0f5d2c22921c5b330))
* **main:** fix response msgs, enums and pw check ([0fe3e09](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0fe3e09ee978019342c34197ef022f169b7a191e))
* **main:** recive postId from path ([6049ff7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6049ff7566f4e73410d65cff7777d62f7257de05))
* minor fixes ([b5d7d7e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b5d7d7ef1be8ae0ff36d5499524bba600fc6125f))
* update user and user password(user must send old and new password) ([2dea089](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2dea08999a537eca03ba95e3f1773630f0dcb13f))
* user can only upload pictures ([194fa66](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/194fa66ac80c015b0645412f192de8c91b722eaf))
* user id ([6730091](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6730091f7919b4669598a5d042914862def5cb15))
* user profile image fix some bugs ([cc4a95c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/cc4a95cada76f2e876998b7ebece363810824a6e))
* user profile picture fix some bugs ([8f24d33](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/8f24d334dde350b99fc6dcddbbc422e2566f9915))

## 1.1.0 (2022-11-24)


### ⚠ BREAKING CHANGES

* **chat:** - ws endpoint `/chat/{chatroomId}` now recieves data as indended
- HTTP controller prefix `chatrooms` changed to `ws/chatrooms`
- POST `{chatroomId}/join") changed to GET `{chatroomId}/subscribe`
* **chat:** Prefix for group message broker is changed from
`/place` to `/chatrooms` and websocket API `/chat/chatroom` is
changed to `/chat/group`
* **chat:** Endpoint `ws /app/chat` is changed to `ws /app/chat/private`. ID type for every res
ource is changed from String to Long. Prefix is changed from `/user` to `/users`. Lastly, queue/sub
path postfix is changed from `/queue/messages`
* **fetcher:** send 'text' in query param instead in
request body.
* **main:** Endpoint is changed from '/api/v1/users/token/refresh' to '/api/v1/auth/token/refre
sh'
* **main:controller:** Path is changed, `{username}` is not used literally. It's a path variable now. Beca
use of that there is no need for sending the username in the body anymore.
* (PUT)api/v1/register -> (POST)api/v1/register
* (POST)api/v1/login -> (POST)/login
* change enpoints for user controller
* GET /summarize does not have query parameter `max_chars`  anymore.

### Features

* add get all users ([e625c39](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e625c391adda3b45244550f72ef134ac26157305))
* add get user(username, email, first name, last name) ([7cf7ca5](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/7cf7ca5cd2a563ac27e2a5c786d3f7c60d6015dd))
* add login with refresh and access tokens ([ff07e5d](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ff07e5dbe303811a677964d4689e356ba65ef5c7))
* add login without token ([e62a516](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e62a516ac51ffaa5a6274f65e8d453ac1feb684d))
* add project template ([ee7319a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ee7319a4cd69aecf21b4f57a2e3095c0e0490f88)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* add roles to users and authorities ([443c09c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/443c09c97babd2bbf57f6391be5675db31ef759b))
* add uncomplete APIs for summarization ([f61cf59](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f61cf595dc5e21b85f2fc0c4e214dde874712f40)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)
* add update user(first name, last name, email) ([192dcc8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/192dcc8032287aba2df6764cd0c8a6bc36619b7d))
* added encoder for password ([d814899](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d8148996642b703fe610385acd17259e12a7dda3))
* **chat:** add auth support for swagger ([8afe3a8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/8afe3a804e26e32752144b398fb4ee0be3c69054)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** add basic chat comm & related (uncomplete) features ([a1dadd1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/a1dadd183dbda92836838e528f2b298e663e1d0e)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** add demo client for basic communication ([5e55c30](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/5e55c3056c184924a1685c77cc86ac55ade0f0a4)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** finish rewrite & add group chats ([1578e8a](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1578e8a18c31328410b40780d73b85650bf1f65a)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** rewrite (incompletely) the whole system ([e647cda](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e647cda81f1d38f30b97a95a3c7deb5aa100f47c)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **main:** add endpoint for claim extraction ([ac95069](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ac95069a2a547a167b5ea8e74d4318ee70ba330d)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **main:** add login handler in order to document internal handler ([c044ae8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c044ae8c922945a40c22d68bf09dd81871b0ff64)), closes [#18](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/18)
* **main:** add system for exception handling ([c3ab913](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c3ab913c90156b4e5feeaedac6d166d52d621d96)), closes [#27](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/27)


### Bug Fixes

* (PUT)api/v1/register -> (POST)api/v1/register ([33b5566](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/33b556611fef858dd414eeb4ad022b24390ad0a4))
* add user registration dto(username,email,firstname,lastname,pass) ([2d10b9f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2d10b9f07d666b24bde89e0e9e8b1d8ef601966d))
* bug fix with missing authorities ([ef650a7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ef650a7811d50bbef605b7b4347403c081143083))
* change enpoints for user controller ([8149638](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/814963810e7e317f2d4ed90a423f70d4c52088f1))
* changed permissions from permit all to only admin role ([6313c07](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6313c07991204f2df3d6d9cda33e03cbf4b581a4))
* **chat:client:** update port to match config change on the server ([459f60f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/459f60fdc1609c48249bfed2764996c5a74d7a77))
* **chat:** change entity ver to non-primitive type ([60a3490](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/60a34901737d502b40e72f5cef54f5a4ab08e41c)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** finish uncomplete chatting system ([e2ea6c1](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e2ea6c1e76f145a8a937b5e66af66ab0ce3b53ea)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** fix JwtService & RestClient ([8864758](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/886475811e51461db0709c2ee8057cc524a1a63d)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** fix type casting problem ([1771fb0](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/1771fb0627fd0787c484cc8f029991cd83a78015)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** fix uncomplete work (rewrite) ([ea37e1f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ea37e1fef158efed659347d559d81341e7bae85a)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** handle RestClient errors like 401 & 403 ([0b0c00d](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0b0c00d185bb4bd33f5ffabd1bc75ae7ac9e5031)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **chat:** resolve merge when there are 2 versions ([0a26527](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/0a26527b1ef8bb2ffe2349af2561d3dbaab68ec5)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **fetcher:** receive data as Query param ([7037b40](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/7037b40ecba9996c2b2b32c606b61bf1ca490e08)), closes [#8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/8)
* fix login for all users ([926c594](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/926c594eeefc39a2d375049c998db4b411b5ca16))
* fix message bug while getting user by username ([4be20ec](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4be20ec45d60b5bf54e4a9a7deb40119105e9659))
* fix wiki summarizer ([4037fa7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4037fa7bcdce84a83021570fdd29ff78872721e4)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)
* **main:config:** fix matcher order & add multiple role permits ([5b8739d](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/5b8739d3d2fab4c701b671756487e4e1f2d71bb3)), closes [#3](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/3)
* **main:controller:** set username in 'addRoleToUser' handler as path... ([57b1f8e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/57b1f8e1a2f1cfe5aaeb4d287812113ef39a58a6))
* **main:filter:** fix path checking in refresh token handler ([b38b8cd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b38b8cdb4e5fdd8d00f315c19e3ed17440cf0eaf))
* **main:sconfig:** change matcher order to allow unauth access to som... ([ca99d1b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ca99d1b71b5c9fe9493b0ea73f705b96b9b27fed))
* **main:sconfig:** reestablish authorization rules ([f96dbda](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f96dbdac78f9f19253b077686f256619c16c1f73)), closes [#3](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/3)
* **main:service:** fix a bug in user data update method ([c66e468](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c66e46807244371a467771acfad123c9ad6888d9))
* **main:** create auth controller and move auth logic to it ([94284ff](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/94284fff3a3d649c6574d15f3dbd0436723ad109)), closes [#18](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/18)
* minor changes ID -> id ([eb7fefe](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/eb7fefe80b56eac75a680b2b9020457e72fca093))
* password checker for blank characters ([77ab32c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/77ab32cb30a9ae31f57514fe6a9f37ed1f6b7c8a))
* remove max_chars in summarize_text handler ([d5e32bd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d5e32bd6612a029a7b2ede5528a92c8f505119c7)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)

## 1.0.0 (2022-11-24)


### ⚠ BREAKING CHANGES

* **fetcher:** send 'text' in query param instead in
request body.
* **main:** Endpoint is changed from '/api/v1/users/token/refresh' to '/api/v1/auth/token/refre
sh'
* **main:controller:** Path is changed, `{username}` is not used literally. It's a path variable now. Beca
use of that there is no need for sending the username in the body anymore.
* (PUT)api/v1/register -> (POST)api/v1/register
* (POST)api/v1/login -> (POST)/login
* change enpoints for user controller
* GET /summarize does not have query parameter `max_chars`  anymore.

### Features

* add get all users ([e625c39](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e625c391adda3b45244550f72ef134ac26157305))
* add get user(username, email, first name, last name) ([7cf7ca5](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/7cf7ca5cd2a563ac27e2a5c786d3f7c60d6015dd))
* add login with refresh and access tokens ([ff07e5d](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ff07e5dbe303811a677964d4689e356ba65ef5c7))
* add login without token ([e62a516](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/e62a516ac51ffaa5a6274f65e8d453ac1feb684d))
* add roles to users and authorities ([443c09c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/443c09c97babd2bbf57f6391be5675db31ef759b))
* add uncomplete APIs for summarization ([f61cf59](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f61cf595dc5e21b85f2fc0c4e214dde874712f40)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)
* add update user(first name, last name, email) ([192dcc8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/192dcc8032287aba2df6764cd0c8a6bc36619b7d))
* added encoder for password ([d814899](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d8148996642b703fe610385acd17259e12a7dda3))
* **main:** add endpoint for claim extraction ([ac95069](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ac95069a2a547a167b5ea8e74d4318ee70ba330d)), closes [#12](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/12)
* **main:** add login handler in order to document internal handler ([c044ae8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c044ae8c922945a40c22d68bf09dd81871b0ff64)), closes [#18](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/18)
* **main:** add system for exception handling ([c3ab913](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c3ab913c90156b4e5feeaedac6d166d52d621d96)), closes [#27](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/27)


### Bug Fixes

* (PUT)api/v1/register -> (POST)api/v1/register ([33b5566](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/33b556611fef858dd414eeb4ad022b24390ad0a4))
* add user registration dto(username,email,firstname,lastname,pass) ([2d10b9f](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/2d10b9f07d666b24bde89e0e9e8b1d8ef601966d))
* bug fix with missing authorities ([ef650a7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ef650a7811d50bbef605b7b4347403c081143083))
* change enpoints for user controller ([8149638](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/814963810e7e317f2d4ed90a423f70d4c52088f1))
* changed permissions from permit all to only admin role ([6313c07](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/6313c07991204f2df3d6d9cda33e03cbf4b581a4))
* **fetcher:** receive data as Query param ([7037b40](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/7037b40ecba9996c2b2b32c606b61bf1ca490e08)), closes [#8](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/8)
* fix login for all users ([926c594](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/926c594eeefc39a2d375049c998db4b411b5ca16))
* fix message bug while getting user by username ([4be20ec](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4be20ec45d60b5bf54e4a9a7deb40119105e9659))
* fix wiki summarizer ([4037fa7](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/4037fa7bcdce84a83021570fdd29ff78872721e4)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)
* **main:config:** fix matcher order & add multiple role permits ([5b8739d](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/5b8739d3d2fab4c701b671756487e4e1f2d71bb3)), closes [#3](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/3)
* **main:controller:** set username in 'addRoleToUser' handler as path... ([57b1f8e](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/57b1f8e1a2f1cfe5aaeb4d287812113ef39a58a6))
* **main:filter:** fix path checking in refresh token handler ([b38b8cd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/b38b8cdb4e5fdd8d00f315c19e3ed17440cf0eaf))
* **main:sconfig:** change matcher order to allow unauth access to som... ([ca99d1b](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/ca99d1b71b5c9fe9493b0ea73f705b96b9b27fed))
* **main:sconfig:** reestablish authorization rules ([f96dbda](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/f96dbdac78f9f19253b077686f256619c16c1f73)), closes [#3](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/3)
* **main:service:** fix a bug in user data update method ([c66e468](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/c66e46807244371a467771acfad123c9ad6888d9))
* **main:** create auth controller and move auth logic to it ([94284ff](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/94284fff3a3d649c6574d15f3dbd0436723ad109)), closes [#18](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/18)
* minor changes ID -> id ([eb7fefe](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/eb7fefe80b56eac75a680b2b9020457e72fca093))
* password checker for blank characters ([77ab32c](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/77ab32cb30a9ae31f57514fe6a9f37ed1f6b7c8a))
* remove max_chars in summarize_text handler ([d5e32bd](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/commit/d5e32bd6612a029a7b2ede5528a92c8f505119c7)), closes [#6](http://gitlab.pmf.kg.ac.rs/BrzoDoLokacije2022/jazzberry/server/issues/6)
