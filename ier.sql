-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ierdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ierdb` ;

-- -----------------------------------------------------
-- Schema ierdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ierdb` DEFAULT CHARACTER SET utf8 ;
USE `ierdb` ;

-- -----------------------------------------------------
-- Table `ierdb`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ierdb`.`Users` ;

CREATE TABLE IF NOT EXISTS `ierdb`.`Users` (
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `type` INT NOT NULL DEFAULT 0,
  `title` VARCHAR(45) NULL,
  `bio` VARCHAR(1000) NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ierdb`.`Addresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ierdb`.`Addresses` ;

CREATE TABLE IF NOT EXISTS `ierdb`.`Addresses` (
  `name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(2) NOT NULL,
  `zip` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`name`, `user_email`),
  CONSTRAINT `fk_user_email`
    FOREIGN KEY (`user_email`)
    REFERENCES `ierdb`.`Users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ierdb`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ierdb`.`Products` ;

CREATE TABLE IF NOT EXISTS `ierdb`.`Products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(45) NOT NULL,
  `price` DECIMAL NOT NULL,
  `description` VARCHAR(1000) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `rating` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ierdb`.`Carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ierdb`.`Carts` ;

CREATE TABLE IF NOT EXISTS `ierdb`.`Carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cart_user_email`
    FOREIGN KEY (`user_email`)
    REFERENCES `ierdb`.`Users` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ierdb`.`Prodarts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ierdb`.`Prodarts` ;

CREATE TABLE IF NOT EXISTS `ierdb`.`Prodarts` (
  `product_id` INT NOT NULL,
  `cart_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`product_id`, `cart_id`),
  CONSTRAINT `fk_prodart_cart_id`
    FOREIGN KEY (`cart_id`)
    REFERENCES `ierdb`.`Carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prodart_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `ierdb`.`Products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
