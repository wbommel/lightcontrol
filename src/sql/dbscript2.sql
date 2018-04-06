-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema LightControl
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema LightControl
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `LightControl` DEFAULT CHARACTER SET utf8 ;
USE `LightControl` ;

-- -----------------------------------------------------
-- Table `LightControl`.`LightRulesGeneral`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LightControl`.`LightRulesGeneral` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Priority` INT NULL COMMENT 'Priority of Rule. 1 is highest. The bigger the number, the lower the priority.',
  `FromDate` DATETIME NULL COMMENT 'General time span during the year when this rule is active. i.e. FromDate = 01.01 and ToDate = 31.12. would be active all the time.',
  `ToDate` DATETIME NULL COMMENT 'General time span during the year when this rule is active. i.e. FromDate = 01.01 and ToDate = 31.12. would be active all the time.',
  `FromTime` DATETIME NULL COMMENT 'Time of operation at the weekday that is 1:n linked in \"RuleWeekdays\" per rule.\ni.e. there is a rule stating FromDate = 01.01.,To Date = 31.12., FromTime = 8:00, ToTime=10:00 and DimTime = 15, that has 5 entries in \"RuleWeekdays\" Mo,Tu,We,Th and Fr would lead to diming up from 8:00 to 8:15 and diming down from 10:00 to 10:15 each and every Mo,Tu,We,Th and Fr the whole year through.',
  `ToTime` DATETIME NULL COMMENT 'Time of operation at the weekday that is 1:n linked in \"RuleWeekdays\" per rule.\ni.e. there is a rule stating FromDate = 01.01.,To Date = 31.12., FromTime = 8:00, ToTime=10:00 and DimTime = 15, that has 5 entries in \"RuleWeekdays\" Mo,Tu,We,Th and Fr would lead to diming up from 8:00 to 8:15 and diming down from 10:00 to 10:15 each and every Mo,Tu,We,Th and Fr the whole year through.',
  `DimTime` INT NULL COMMENT 'DimTime of Operation. See FromTime and ToTime for explanation.',
  `From` VARCHAR(16) NULL COMMENT 'From/To format is semikolon separated value string:\nYYYY;MM;DD;hh;mm',
  `To` VARCHAR(16) NULL COMMENT 'From/To format is semikolon separated value string:\nYYYY;MM;DD;hh;mm',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = '					';

INSERT INTO `lightrulesgeneral` (`Priority`, `FromDate`, `ToDate`, `FromTime`, `ToTime`, `DimTime`, `From`, `To`) VALUES
(9999, '2000-01-01 12:00:00', '2000-12-31 12:00:00', '2000-01-01 08:00:00', '2000-01-01 11:00:00', 30, '0000;01;01;08;00', '9999;12;31;11;00'),
(9999, '2000-01-01 12:00:00', '2000-12-31 12:00:00', '2000-01-01 08:00:00', '2000-01-01 11:00:00', 30, '0000;01;01;16;00', '9999;12;31;20;00');

-- -----------------------------------------------------
-- Table `LightControl`.`RuleWeekdays`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LightControl`.`RuleWeekdays` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `LightRulesGeneralId` INT NULL,
  `WeekdayCode` VARCHAR(2) NULL,
  PRIMARY KEY (`id`),
  INDEX `id_idx` (`LightRulesGeneralId` ASC),
  CONSTRAINT `LightRulesGeneralWeekdays`
    FOREIGN KEY (`LightRulesGeneralId`)
    REFERENCES `LightControl`.`LightRulesGeneral` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `ruleweekdays` (`LightRulesGeneralId`, `WeekdayCode`) VALUES
(1, 'Mo'),
(1, 'Tu'),
(1, 'We'),
(1, 'Th'),
(1, 'Fr'),
(2, 'Mo'),
(2, 'Tu'),
(2, 'We'),
(2, 'Th'),
(2, 'Fr');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
