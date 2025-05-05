-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2025 at 01:58 PM
-- Server version: 11.7.2-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spotify_clone`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `album_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `deception` longtext DEFAULT NULL,
  `total_tracks` int(11) NOT NULL,
  `releasedate` date DEFAULT NULL,
  `artist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`album_id`, `title`, `deception`, `total_tracks`, `releasedate`, `artist_id`) VALUES
(6, 'Mùa Hạ Nhớ Em 2', 'hihi', 3, NULL, 1),
(7, 'Mùa Hạ Nhớ Em 2', 'hihi', 2, NULL, 1),
(8, 'Mùa Hạ Nhớ Em 2', 'hihi', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `artists`
--

CREATE TABLE `artists` (
  `artist_id` int(11) NOT NULL,
  `popularity_score` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gener` varchar(255) DEFAULT NULL,
  `artist_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artists`
--

INSERT INTO `artists` (`artist_id`, `popularity_score`, `name`, `gener`, `artist_img`) VALUES
(1, 90, 'Sơn Tùng M-TP', 'Pop', ''),
(2, 70, 'HIEUTHUHAI', 'Bolero', ''),
(5, 190561, 'J97', 'Người ngoại lai', '');

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add track', 7, 'add_track'),
(26, 'Can change track', 7, 'change_track'),
(27, 'Can delete track', 7, 'delete_track'),
(28, 'Can view track', 7, 'view_track'),
(29, 'Can add album', 8, 'add_album'),
(30, 'Can change album', 8, 'change_album'),
(31, 'Can delete album', 8, 'delete_album'),
(32, 'Can view album', 8, 'view_album'),
(33, 'Can add artist', 9, 'add_artist'),
(34, 'Can change artist', 9, 'change_artist'),
(35, 'Can delete artist', 9, 'delete_artist'),
(36, 'Can view artist', 9, 'view_artist'),
(37, 'Can add user', 10, 'add_user'),
(38, 'Can change user', 10, 'change_user'),
(39, 'Can delete user', 10, 'delete_user'),
(40, 'Can view user', 10, 'view_user'),
(41, 'Can add playlist', 11, 'add_playlist'),
(42, 'Can change playlist', 11, 'change_playlist'),
(43, 'Can delete playlist', 11, 'delete_playlist'),
(44, 'Can view playlist', 11, 'view_playlist'),
(45, 'Can add playlist detail', 12, 'add_playlistdetail'),
(46, 'Can change playlist detail', 12, 'change_playlistdetail'),
(47, 'Can delete playlist detail', 12, 'delete_playlistdetail'),
(48, 'Can view playlist detail', 12, 'view_playlistdetail'),
(49, 'Can add playlist order', 13, 'add_playlistorder'),
(50, 'Can change playlist order', 13, 'change_playlistorder'),
(51, 'Can delete playlist order', 13, 'delete_playlistorder'),
(52, 'Can view playlist order', 13, 'view_playlistorder'),
(53, 'Can add role', 14, 'add_role'),
(54, 'Can change role', 14, 'change_role'),
(55, 'Can delete role', 14, 'delete_role'),
(56, 'Can view role', 14, 'view_role');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(8, 'albums', 'album'),
(9, 'artists', 'artist'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(12, 'playlistdetail', 'playlistdetail'),
(11, 'playlists', 'playlist'),
(13, 'playlist_oder', 'playlistorder'),
(14, 'role', 'role'),
(6, 'sessions', 'session'),
(7, 'tracks', 'track'),
(10, 'users', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2025-04-27 02:24:26.915005'),
(2, 'auth', '0001_initial', '2025-04-27 02:24:27.300711'),
(3, 'admin', '0001_initial', '2025-04-27 02:24:27.412854'),
(4, 'admin', '0002_logentry_remove_auto_add', '2025-04-27 02:24:27.418093'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2025-04-27 02:24:27.426527'),
(6, 'artists', '0001_initial', '2025-04-27 02:24:27.441075'),
(7, 'albums', '0001_initial', '2025-04-27 02:24:27.486972'),
(8, 'contenttypes', '0002_remove_content_type_name', '2025-04-27 02:24:27.545207'),
(9, 'auth', '0002_alter_permission_name_max_length', '2025-04-27 02:24:27.583612'),
(10, 'auth', '0003_alter_user_email_max_length', '2025-04-27 02:24:27.608009'),
(11, 'auth', '0004_alter_user_username_opts', '2025-04-27 02:24:27.614040'),
(12, 'auth', '0005_alter_user_last_login_null', '2025-04-27 02:24:27.666425'),
(13, 'auth', '0006_require_contenttypes_0002', '2025-04-27 02:24:27.669349'),
(14, 'auth', '0007_alter_validators_add_error_messages', '2025-04-27 02:24:27.675953'),
(15, 'auth', '0008_alter_user_username_max_length', '2025-04-27 02:24:27.700209'),
(16, 'auth', '0009_alter_user_last_name_max_length', '2025-04-27 02:24:27.723415'),
(17, 'auth', '0010_alter_group_name_max_length', '2025-04-27 02:24:27.746299'),
(18, 'auth', '0011_update_proxy_permissions', '2025-04-27 02:24:27.755071'),
(19, 'auth', '0012_alter_user_first_name_max_length', '2025-04-27 02:24:27.778002'),
(20, 'role', '0001_initial', '2025-04-27 02:24:27.793124'),
(21, 'users', '0001_initial', '2025-04-27 02:24:27.846169'),
(22, 'tracks', '0001_initial', '2025-04-27 02:24:27.934097'),
(23, 'playlist_oder', '0001_initial', '2025-04-27 02:24:28.005214'),
(24, 'playlists', '0001_initial', '2025-04-27 02:24:28.059669'),
(25, 'playlistdetail', '0001_initial', '2025-04-27 02:24:28.156920'),
(26, 'sessions', '0001_initial', '2025-04-27 02:28:24.884554');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlistdetail`
--

CREATE TABLE `playlistdetail` (
  `id` bigint(20) NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `track_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ispublic` tinyint(1) NOT NULL,
  `releasedate` date DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playlist_order`
--

CREATE TABLE `playlist_order` (
  `playlist_oder_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `datte_oder` date DEFAULT NULL,
  `track_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `deception` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`, `deception`) VALUES
(1, 'admin', 'khong'),
(2, 'người dùng', 'người ngoại lai');

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `track_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `is_Copyright` tinyint(1) NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image_url` longtext DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `namemp3` varchar(200) NOT NULL,
  `album_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`track_id`, `title`, `is_Copyright`, `price`, `image_url`, `release_date`, `namemp3`, `album_id`, `artist_id`) VALUES
(11, 'Chúng Ta Không Thuộc Về Nhau', 1, NULL, 'chungtakhongthuocvenhau.jpeg', NULL, 'chungtakhongthuocvenhau.mp3', 6, 1),
(12, 'Em của ngày hôm qua', 1, NULL, NULL, NULL, 'emcuangayhomqua.mp3', 6, 1),
(13, 'Anh Sai Rồi', 1, NULL, NULL, NULL, 'Anh Sai rồi.mp3', 6, 1),
(14, 'Nước Mắt Cá Xấu', 1, NULL, NULL, NULL, 'Nước Mắt Cá Xấu.mp3', 7, 2),
(15, 'Exit Sign', 1, NULL, NULL, NULL, 'Exit Sign.mp3', 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `passwordhash` varchar(255) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `accesstoken` longtext DEFAULT NULL,
  `refreshtoken` longtext DEFAULT NULL,
  `email` varchar(254) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image_user` longtext DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `passwordhash`, `fullname`, `birthday`, `accesstoken`, `refreshtoken`, `email`, `phone`, `image_user`, `is_active`, `role_id`) VALUES
(1, 'huynguyen', 'pbkdf2_sha256$870000$WBhAVoGJ0UMUZvCeT2RNTA$lY/1aJS4Py7HIgsH29sSldgKqsSNNJvaLmbfplk6p7o=', 'huy', '2025-04-10', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ1ODk4OTQ0LCJpYXQiOjE3NDU4OTg2NDQsImp0aSI6IjRjYTM4ZWNkMjdhYzRmMDFiZTJjN2QzZDMyNTU5OTJkIiwidXNlcl9pZCI6MX0.PCGy2g85gelMmtL0nfHCw8q7weh-lGu4k44pQD9mH6I', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTk4NTA0NCwiaWF0IjoxNzQ1ODk4NjQ0LCJqdGkiOiIyM2JhMTgyYzcyM2Q0MjcxOWQ1OTRlYzM3YzUxYjZlYSIsInVzZXJfaWQiOjF9.B3db-O33V40O9QUwfST1EwnmGiXPuUgEQWtUDSP25Jo', 'huynguyen6498@gmail.com', '0972698067', NULL, 1, 2),
(3, 'huynguyen2', 'pbkdf2_sha256$870000$7vTPOGOQ01fnFirXn73wuE$Z/tOpAwDe3dz8fUJGpLucOEUPi1h8uCvx9jBr+/ZLZw=', 'huy', '2025-04-03', NULL, NULL, 'lelieu1898@gmail.com', '0972698065', NULL, 1, 2),
(4, 'huynguyen4', 'pbkdf2_sha256$870000$SSQtlmKEAZEozk687lB2Tc$o8FNnaVsqM5BtUqjBzGuM2HWvfbgsGNpeJhydOdgshA=', 'huy', '2025-04-02', NULL, NULL, 'manicin04@gmail.com', '0972698067', NULL, 1, 2),
(5, 'huynguyen5', 'pbkdf2_sha256$870000$Eif4PN36W35Ury8chdeUvq$uYGUu3spguyn/jfhEgbVlPn8iCioilaIFh8pDyGy7Xc=', 'huy', '2025-04-03', NULL, NULL, 'tranhoang0906980@gmail.com', '0972698067', NULL, 1, 2),
(7, 'huynguyen7', 'pbkdf2_sha256$870000$VdUAbUeWq2CTjT2tv7QZIV$al0XL8YuZPbcGgrLwZQbzVZcHDOB3kGKe6kE0tCZdIg=', 'huy', '2025-04-02', NULL, NULL, 'lelieu1898@gmail.co', '0972698067', NULL, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`album_id`),
  ADD KEY `albums_artist_id_8a9e6bb4_fk_artists_artist_id` (`artist_id`);

--
-- Indexes for table `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`artist_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `playlistdetail`
--
ALTER TABLE `playlistdetail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `playlistdetail_playlist_id_track_id_6d1dfe82_uniq` (`playlist_id`,`track_id`),
  ADD KEY `playlistdetail_track_id_6bc02efc_fk_tracks_track_id` (`track_id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `playlists_user_id_b4325f92_fk_users_user_id` (`user_id`);

--
-- Indexes for table `playlist_order`
--
ALTER TABLE `playlist_order`
  ADD PRIMARY KEY (`playlist_oder_id`),
  ADD KEY `playlist_order_track_id_faca14bf_fk_tracks_track_id` (`track_id`),
  ADD KEY `playlist_order_user_id_f25edd7d_fk_users_user_id` (`user_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`track_id`),
  ADD KEY `tracks_album_id_65b969e4_fk_albums_album_id` (`album_id`),
  ADD KEY `tracks_artist_id_5f366da1_fk_artists_artist_id` (`artist_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `users_role_id_1900a745_fk_role_role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `artists`
--
ALTER TABLE `artists`
  MODIFY `artist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `playlistdetail`
--
ALTER TABLE `playlistdetail`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `playlist_order`
--
ALTER TABLE `playlist_order`
  MODIFY `playlist_oder_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_artist_id_8a9e6bb4_fk_artists_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `playlistdetail`
--
ALTER TABLE `playlistdetail`
  ADD CONSTRAINT `playlistdetail_playlist_id_8b730926_fk_playlists_playlist_id` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`),
  ADD CONSTRAINT `playlistdetail_track_id_6bc02efc_fk_tracks_track_id` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_user_id_b4325f92_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `playlist_order`
--
ALTER TABLE `playlist_order`
  ADD CONSTRAINT `playlist_order_track_id_faca14bf_fk_tracks_track_id` FOREIGN KEY (`track_id`) REFERENCES `tracks` (`track_id`),
  ADD CONSTRAINT `playlist_order_user_id_f25edd7d_fk_users_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `tracks`
--
ALTER TABLE `tracks`
  ADD CONSTRAINT `tracks_album_id_65b969e4_fk_albums_album_id` FOREIGN KEY (`album_id`) REFERENCES `albums` (`album_id`),
  ADD CONSTRAINT `tracks_artist_id_5f366da1_fk_artists_artist_id` FOREIGN KEY (`artist_id`) REFERENCES `artists` (`artist_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_1900a745_fk_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
