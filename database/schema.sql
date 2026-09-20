-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema job_application_tracker_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema job_application_tracker_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `job_application_tracker_db` ;
USE `job_application_tracker_db` ;

-- -----------------------------------------------------
-- Table `job_application_tracker_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `job_application_tracker_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_application_tracker_db`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `job_application_tracker_db`.`status` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `job_application_tracker_db`.`applications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `job_application_tracker_db`.`applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company` VARCHAR(100) NOT NULL,
  `position` VARCHAR(100) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `salary` VARCHAR(100) NOT NULL,
  `applied_at` DATETIME NULL,
  `notes` TEXT NULL,
  `url` TEXT NULL,
  `user_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_applications_users_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_applications_status1_idx` (`status_id` ASC) VISIBLE,
  CONSTRAINT `fk_applications_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `job_application_tracker_db`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_applications_status1`
    FOREIGN KEY (`status_id`)
    REFERENCES `job_application_tracker_db`.`status` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
