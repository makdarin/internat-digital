-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 15 2022 г., 18:37
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
-- Структура таблицы `plan`
--

DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `day` varchar(20) COLLATE utf8_bin NOT NULL,
  `morning` tinyint(1) NOT NULL,
  `evenig` int(11) NOT NULL,
  `description` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `plan`
--

INSERT INTO `plan` (`id`, `task`, `day`, `morning`, `evenig`, `description`, `updated`, `created`) VALUES
(1, 'Бег 3 км', 'Понедельник', 1, 0, 'Разминка, бег у моря', '2022-07-12 19:53:40', '2022-07-12 19:53:40'),
(2, 'пары', 'суббота', 1, 0, 'бег,общая разминка,пары-10 раундов,ОФП', '2011-07-24 00:00:00', '2022-07-24 00:00:00'),
(3, 'пары', 'понедельник', 1, 1, 'пары, фронткик -отработки', '2022-08-18 00:00:00', '2022-08-18 00:00:00'),
(4, 'отработка защиты -блоки ногами', 'понедельник', 1, 1, 'основные отработки - удар блок,блок удар.', '2022-09-14 00:00:00', '2022-09-14 00:00:00'),
(5, 'руки-основные связки', 'вторник', 1, 0, 'кросс,работа в парах', '2022-09-15 00:00:00', '2022-09-15 00:00:00'),
(6, 'интервальная работа на мешках', 'среда', 1, 1, 'кросс,работа на мешках.', '2022-09-15 20:24:00', '2022-09-15 20:24:00'),
(7, 'удары ногами', 'четверг', 1, 0, 'кросс,робота в парах', '2022-09-15 20:28:00', '2022-09-15 20:29:00'),
(8, 'спаринги', 'пятница', 1, 1, '12-раундов произвольно', '2022-09-15 20:32:00', '2022-09-15 20:32:00'),
(9, 'игровая тренеровка', 'суббота', 1, 0, 'футбол', '2022-09-15 20:32:00', '2022-09-15 20:32:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
