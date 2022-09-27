-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 27 2022 г., 18:43
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
-- Структура таблицы `international_events`
--

DROP TABLE IF EXISTS `international_events`;
CREATE TABLE IF NOT EXISTS `international_events` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `year` int(10) NOT NULL,
  `name_event` varchar(50) COLLATE utf8_bin NOT NULL,
  `country` varchar(50) COLLATE utf8_bin NOT NULL,
  `sportsman` varchar(50) COLLATE utf8_bin NOT NULL,
  `weight_kg` int(20) NOT NULL,
  `result` varchar(20) COLLATE utf8_bin NOT NULL,
  `createdAt` datetime(6) NOT NULL,
  `updatedAt` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `createdAt` (`createdAt`),
  UNIQUE KEY `createdAt_2` (`createdAt`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `international_events`
--

INSERT INTO `international_events` (`id`, `year`, `name_event`, `country`, `sportsman`, `weight_kg`, `result`, `createdAt`, `updatedAt`) VALUES
(3, 2007, 'чемпионат мира', 'Тайланд', 'Яцун Андрей', 48, 'бронза', '2022-07-15 20:44:00.000000', '2022-07-14 00:00:00.000000'),
(9, 2008, 'TreX-gemas', 'Корея', 'Любченко Игорь', 54, 'бронза', '2022-07-15 21:24:00.000000', '2022-07-15 00:00:00.000000'),
(11, 2009, 'чемпионат европы', 'Латвия', 'Куляба Сергей', 60, 'бронза', '2022-07-15 21:36:00.000000', '2022-07-15 00:00:00.000000'),
(13, 2010, 'чемпионат европы', 'Италия', 'Куляба Сергей', 67, 'бронза', '2022-07-16 20:01:00.000000', '2021-07-16 00:00:00.000000'),
(19, 2011, 'чемпионат европы', 'Турция', 'Куляба Сергей', 67, 'бронза', '2022-07-17 17:05:00.000000', '2022-07-17 00:00:00.000000'),
(20, 2011, 'чемпионат мира', 'Узбекистан', 'Кошкин Алексей', 48, 'бронза', '2022-07-17 17:09:00.000000', '2022-07-17 00:00:00.000000'),
(33, 2014, 'чемпионат европы', 'Польща', 'Куляба Сергей', 67, 'бронза', '2022-07-17 20:37:00.000000', '2022-07-17 00:00:00.000000'),
(35, 2015, 'чемпионат мира среди студентов', 'Тайланд', 'Шармонова Анастасия ', 57, 'бронза', '2015-07-18 20:40:00.000000', '2022-07-18 00:00:00.000000'),
(39, 2016, 'чемпионат европы', 'Хорватия', 'Булат Валентин', 57, 'бронза', '2022-07-18 21:03:00.000000', '2022-07-18 00:00:00.000000'),
(48, 2017, 'кубок Анталии', 'Турция', 'Булат Валентин', 57, 'бронза', '2022-07-19 19:35:00.000000', '2022-07-19 00:00:00.000000'),
(50, 2017, 'кубок Анталии', 'Турция', 'Король Эдуард', 71, 'бронза', '2022-07-19 19:44:00.000000', '2022-07-19 00:00:00.000000'),
(59, 2021, 'чемпионар мира', 'Тайланд', 'Мустафаев Башир', 81, 'бронза', '2022-07-19 20:29:00.000000', '2022-07-19 00:00:00.000000'),
(60, 2022, 'чемпионат европы', 'Турция\r\n                                          ', 'Любченко Игорь', 67, 'бронза', '2022-07-19 20:34:00.000000', '2022-07-19 00:00:00.000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
