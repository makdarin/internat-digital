-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Авг 13 2022 г., 20:39
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
-- Структура таблицы `sportsmen`
--

DROP TABLE IF EXISTS `sportsmen`;
CREATE TABLE IF NOT EXISTS `sportsmen` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `surname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `bithday_date` date DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Дамп данных таблицы `sportsmen`
--

INSERT INTO `sportsmen` (`id`, `name`, `surname`, `bithday_date`, `phone`, `created`, `updated`) VALUES
(1, 'Игорь', 'Любченко', '1991-03-16', '+380934293027', '2022-07-20 00:00:00', '2022-07-20 00:00:00'),
(2, 'Сергей', 'Куляба', '1991-08-31', '+30936858483', '2022-07-21 00:00:00', '2022-07-21 00:00:00'),
(3, 'Эдуард', 'Король', '1983-07-31', '+30503914100', '2022-07-21 20:22:00', '2022-07-21 00:00:00'),
(4, 'Алексей', 'Тишляков', '1991-10-16', '+380935730255', '2022-07-24 00:00:00', '2022-07-24 00:00:00'),
(5, 'Дмитрий', 'Прихидько', '1991-11-10', NULL, '2022-07-24 20:20:00', '2022-07-24 00:00:00'),
(6, 'Алексей', 'Кошкин', '1994-01-16', '+380638592753', '2022-07-24 20:27:00', '2022-07-24 00:00:00'),
(7, 'Александр', 'Березовский', NULL, NULL, '2022-07-25 00:00:00', '2022-07-25 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
