describe('Connect to test database', () => {
    it('Can connect to the database', () => {
      cy.task(
        "queryDb",
        "CREATE TABLE Students(StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
      );
    });
  
    it("Insert entries", () => {
      cy.task("queryDb",
        `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
        (1, 'John', 'Spring-2024', 'New York'),
        (2, 'Emma', 'Spring-2024', 'Los Angeles'),
        (3, 'Michael', 'Spring-2024', 'Chicago'),
        (4, 'Sophia', 'Spring-2024', 'Houston'),
        (5, 'William', 'Spring-2024', 'Phoenix');`
      );
    });
  
    it('Can fetch all students from the group', () => {
      cy.task('queryDb', 'SELECT * FROM Students WHERE StudentGroup = "Spring-2024"').then((result) => {
      cy.log(JSON.stringify(result));
      });
      });
  
    it("Can delete the database", () => {
      cy.task("queryDb", "DROP TABLE Students");
    });
  });
  