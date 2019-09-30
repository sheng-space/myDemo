/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.21 : Database - db_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `db_system`;

/*Table structure for table `sys_menu` */

DROP TABLE IF EXISTS `sys_menu`;

CREATE TABLE `sys_menu` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `code` varchar(30) DEFAULT NULL COMMENT '菜单标识',
  `path` varchar(100) DEFAULT NULL COMMENT '菜单url',
  `seq` int(4) DEFAULT NULL COMMENT '排序',
  `parent_id` varchar(36) DEFAULT NULL COMMENT '父级ID',
  `icon` varchar(50) DEFAULT NULL COMMENT '小图标',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_menu` */

insert  into `sys_menu`(`id`,`name`,`code`,`path`,`seq`,`parent_id`,`icon`) values ('08b160bd-10af-489e-93f9-fdc5f7692b00','系统管理','system','system',100,'0','setting'),('08b160bd-10af-489e-93f9-fdc5f7692b01','用户管理','system.user','user',1,'08b160bd-10af-489e-93f9-fdc5f7692b00','user'),('08b160bd-10af-489e-93f9-fdc5f7692b02','菜单管理','system.menu','menu',2,'08b160bd-10af-489e-93f9-fdc5f7692b00','menu');

/*Table structure for table `sys_param` */

DROP TABLE IF EXISTS `sys_param`;

CREATE TABLE `sys_param` (
  `id` varchar(36) NOT NULL COMMENT '主键',
  `key` varchar(30) DEFAULT NULL COMMENT 'key',
  `value` varchar(200) DEFAULT NULL COMMENT 'value',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '录入时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `sys_param` */

/*Table structure for table `sys_user` */

DROP TABLE IF EXISTS `sys_user`;

CREATE TABLE `sys_user` (
  `id` varchar(36) NOT NULL,
  `account` varchar(50) DEFAULT NULL COMMENT '账号',
  `name` varchar(50) DEFAULT NULL COMMENT '姓名',
  `status` int(1) DEFAULT '0' COMMENT '0:禁用、1：启用',
  `phone` varchar(30) DEFAULT NULL COMMENT '手机号码',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `create_time` datetime DEFAULT NULL COMMENT '添加时间',
  `imgUrl` varchar(200) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sys_user` */

insert  into `sys_user`(`id`,`account`,`name`,`status`,`phone`,`password`,`create_time`,`imgUrl`) values ('1','admin','管理员',1,'18888888888','123456','2017-06-21 14:54:31','http://47.112.105.128:8880/file/file/ruoyuchen/20190328/3ca34a9b-f660-46e9-9ef1-df0616400832.png'),('5b3a89fa-7490-45eb-a5f2-92e3cbd477ce','sheng','笙',1,NULL,'123456','2019-05-15 15:53:07','');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
