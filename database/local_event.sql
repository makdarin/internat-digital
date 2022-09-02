-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 02 2022 г., 18:25
-- Версия сервера: 5.7.36
-- Версия PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `internat`
--

-- --------------------------------------------------------

--
-- Структура таблицы `local_event`
--

DROP TABLE IF EXISTS `local_event`;
CREATE TABLE IF NOT EXISTS `local_event` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `year` int(10) NOT NULL,
  `name_event` varchar(50) COLLATE utf8_bin NOT NULL,
  `city` varchar(50) COLLATE utf8_bin NOT NULL,
  `sportsman` varchar(50) COLLATE utf8_bin NOT NULL,
  `weigt_kg` int(10) NOT NULL,
  `result` varchar(20) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `local_event`
--

INSERT INTO `local_event` (`id`, `year`, `name_event`, `city`, `sportsman`, `weigt_kg`, `result`, `createdAt`, `updatedAt`) VALUES
(1, 2022, 'открытый ринг', 'Одесса', 'Король Эдуард', 75, 'зачет', '2022-09-01 00:00:00.000000', '2022-09-01 00:00:00.000000'),
(2, 2022, 'открытый ринг', 'Одесса', 'Мустафаев Шамиль', 75, 'зачет', '2022-09-01 21:29:00.000000', '2022-09-01 21:30:00.000000'),
(3, 2022, 'открытый ринг', 'Одесса', 'Мартиросов Леонид', 49, 'зачет', '2022-09-02 00:00:00.000000', '2022-09-02 00:00:00.000000'),
(4, 2022, 'открытый ринг', 'Одесса', 'Глыняный Радомир', 35, 'зачет\r\n             ', '2022-09-02 19:58:00.000000', '2022-09-02 19:59:00.000000'),
(5, 2022, 'открытый ринг', 'Одесса', 'Островский Тимур', 25, 'зачет', '2022-09-02 20:02:00.000000', '2022-09-02 20:02:00.000000'),
(6, 2022, 'открытый ринг', 'Одесса', 'Островский Тимур', 25, 'зачет', '2022-09-02 20:02:00.000000', '2022-09-02 20:02:00.000000'),
(7, 2022, 'открытый ринг', 'Одесса', 'Зубенко Назар\r\n                                   ', 23, 'зачет', '2022-09-02 20:06:00.000000', '2022-09-02 20:07:00.000000'),
(8, 2022, 'открытый ринг', 'Одесса', 'Лано Егор', 27, 'зачет', '2022-09-02 20:18:00.000000', '2022-09-02 20:18:00.000000'),
(9, 2022, 'открытый ринг', 'Одесса', 'Линьков Сергей', 65, 'зачет', '2022-09-02 20:22:00.000000', '2022-09-02 20:23:00.000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
