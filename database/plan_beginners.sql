-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 17 2022 г., 11:21
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
-- Структура таблицы `plan_beginners`
--

DROP TABLE IF EXISTS `plan_beginners`;
CREATE TABLE IF NOT EXISTS `plan_beginners` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `day` varchar(50) COLLATE utf8_bin NOT NULL,
  `task` varchar(50) COLLATE utf8_bin NOT NULL,
  `description` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `updated` datetime(6) DEFAULT NULL,
  `created` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `plan_beginners`
--

INSERT INTO `plan_beginners` (`id`, `day`, `task`, `description`, `updated`, `created`) VALUES
(1, 'понедельник', 'ноги', 'блок - ответ', '2022-10-17 00:00:00.000000', '2022-10-17 00:00:00.000000'),
(2, 'среда', 'руки', 'основные связки', '2022-10-17 13:17:00.000000', '2022-10-17 13:17:00.000000'),
(3, 'пятница', 'колени', 'связки колени - ноги', '2022-10-17 13:20:00.000000', '2022-10-17 13:20:00.000000');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
