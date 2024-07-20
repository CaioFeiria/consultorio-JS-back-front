use consultorio;

-- 2 - DML (Data Manipulation Language)

--- TABELA M�DICO ---

--inserir dados na tabela m�dico
insert into medico (nome,crm) values ('Zequinha','123456/SP');
insert into medico (nome,crm) values ('Joca','123457/SP');
insert medico (nome,crm) values ('Little Zeca','123458/SP');
--insert into medico values ('Big Joca','123459/SP'); -- CUIDADO! Seguir� a ordem das colunas criadas na tabela.
insert into medico values ('123459/SP', 'Big Joca');
insert into medico (crm, nome) values ('123460/SP', 'Jo�o'), ('123461/MG', 'Lee'); --mais de um conjunto de dados.

insert into medico (nome,crm) values ('Anderson','123480/SP'); -- commit impl�cito

insert into medico (nome,crm) values ('Anderson','123481/SP');
commit; -- commit expl�cito


--excluir dados da tabela m�dico
--delete => filtro (where)
delete from medico where crm = 'Big Joca'; -- commit impl�cito

delete from medico where nome = 'Lee';
commit; -- commit expl�cito
rollback; -- desfazer as instru��es executas ap�s � execu��o do �ltimo commit.

--Alterar nome de um m�dico
update medico 
   set nome = 'AndersonXD' 
 where crm = '123481/SP';

update medico set nome = 'Zequinha' where crm = '123456/SP'
update medico set nome = 'Joca' where crm = '123457/SP'
update medico set nome = 'Little Zeca' where crm = '123458/SP'
update medico set nome = 'Big Joca' where crm = '123459/SP'
update medico set nome = 'Jo�o' where crm = '123460/SP'
update medico set nome = 'Anderson' where crm = '123480/SP'
update medico set nome = 'Anderson' where crm = '123481/SP'
update medico set nome = 'Kervini' where crm = '123490/SP'
update medico set nome = 'Kervini1' where crm = '123491/SP'


--selecionar dados do cliente
select * from medico; -- * => todas as colunas.
select crm, nome from medico;

select * 
  from medico 
 where nome = 'Lee'; -- filtro para nome igual a Lee.

--selecionar m�dicos que tenham a letra L no come�o do nome
select crm, nome
  from medico
 where nome like 'L%'; --% => coringa

 --selecionar m�dicos que tenham a letra 'a' no final do nome
 select crm, nome
  from medico
 where nome like '%a';

 --selecionar m�dicos que tenham a letra 'a' no nome
 --Cuidado com este select com filtro % % => derrubar o SGBD :(
 select crm, nome
  from medico
 where nome like '%a%';

--selecionar m�dicos que tenham a letra 'e' na segunda letra do nome
 select crm, nome
  from medico
 where nome like '_e%'; -- _ => coringa

--Em cen�rios de transa��es n�o se esque�a de finalizar com Commit ou Rollback
--Caso contr�rio, os objetos envolvidos podem ficar travados (LOCK)
begin transaction
 delete from medico where nome = 'Big Joca';
rollback transaction
commit transaction

sp_help medico

----- TABELA PACIENTE ---

sp_help paciente

insert into paciente (nome, datanascimento)
	values ('Vanderslei', '1972-03-21');

insert into paciente (nome, datanascimento)
	values ('Nar', getdate() - 7000);

insert into paciente (nome, datanascimento)
	values ('Guilherme', getdate() - 12000);

delete from paciente where codigo = 1;

select * from paciente;

update paciente set nome = 'Joca' where codigo = 3;

delete from paciente where codigo = 3;

--selecionar pacientes que nasceram no m�s 5

select codigo, nome, datanascimento
  from paciente
 where month(datanascimento) = 5;

select codigo, nome, datanascimento
  from paciente
 where datanascimento like '%-05-%';

select codigo, nome, datanascimento
  from paciente
 where datepart(m,datanascimento) = 5;

--selecionar pacientes que nasceram no ano de 2005
select codigo, nome, datanascimento
  from paciente
 where datepart(yyyy,datanascimento) = 2005;

select codigo, nome, datanascimento
  from paciente
 where datanascimento >= '2005-01-01'
   and datanascimento <= '2005-12-31';

select codigo, nome, datanascimento
  from paciente
 where datanascimento between '2005-01-01' and '2005-12-31';

select codigo, nome, datanascimento
  from paciente
 where datanascimento > '2004-12-31'
   and datanascimento < '2006-01-01';

select codigo, nome, datanascimento
  from paciente
 where year(datanascimento) = 2005;

select codigo, nome, datanascimento
  from paciente
 where datanascimento like '2005-%';

 select codigo, nome, datanascimento
  from paciente
 where datanascimento like '2005%';

 select codigo, nome, datanascimento
  from paciente
 where datanascimento like '2005______';

 ---Inserir as consultas

 sp_help consulta

insert into consulta (crm,codigo,[data],hora)
	values ('123458/SP',4,getdate(),'16:00');

insert into consulta (crm,codigo,[data],hora)
	values ('123458/SP',2,getdate(),'16:00');

select consulta.crm, medico.nome as medico, 
       consulta.codigo, paciente.nome as paciente, 
	   consulta.[data], consulta.hora
  from consulta 
  inner join medico on medico.crm = consulta.crm
  inner join paciente on paciente.codigo = consulta.codigo
 where consulta.crm = '123458/SP'
   and consulta.codigo = 2
   and consulta.[data] = '2024-03-22';

select c.crm, m.nome as medico, 
       c.codigo, p.nome as paciente, 
	   c.[data], c.hora
  from consulta as c
  inner join medico as m on m.crm = c.crm
  inner join paciente as p on p.codigo = c.codigo
 where c.crm = '123458/SP'
   and c.codigo = 2
   and c.[data] = '2024-03-22';


select nome
  from medico
 where crm = '123458/SP';

select nome
  from paciente
 where codigo = 2;


 select *
  from medico

select *
  from paciente

select *
  from consulta






