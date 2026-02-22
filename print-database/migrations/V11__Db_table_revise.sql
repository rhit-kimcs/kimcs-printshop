Alter table dbo.PrintOrders
    drop column departmentname;

Alter table dbo.PrintOrders
    add department_name NVARCHAR(100) NOT NULL;
    
Alter table dbo.PrintOrders
    alter column uid NOT NULL;