--Arquivo de Script

--Linguagem SQL 

-- 1 - DDL (Data Definition Language) => Preparar as estruturas de armazenamento

--Instrução para criar a base de dados.
create database Consultorio;
GO;
--Instrução para deixar a base de dados ativa.
use Consultorio;
GO;
--Criar a tabela medico com suas respectivas colunas.
create table medico (
	crm varchar(20),
	nome varchar(100) not null,
	constraint pk_medico primary key (crm)
);
GO;
--Criar a tabela paciente com suas respectivas colunas.
create table paciente(
	codigo int identity(1,1),
	nome varchar(100) not null,
	datanascimento date not null,
	constraint pk_codigo primary key (codigo)
);
GO;
--Criar a tabela consulta com suas respectivas colunas e seus respectivos relacionamentos (FKs)
create table consulta (
	crm varchar(20),
	codigo int,
	[data] date not null, --[] não é um array, apenas para não reconhecer como palavra chave do SQL => abraçadinho BY Anderson - XD.
	hora time not null,
	constraint pk_consulta primary key (crm, codigo, [data]),
	constraint fk_consulta_medico foreign key (crm) references medico (crm),
	constraint fk_consulta_paciente foreign key (codigo) references paciente (codigo)
);

sp_help consulta
