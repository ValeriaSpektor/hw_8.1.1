describe('Connect to test database', () => {
  beforeEach(() => {
    // Before each test, create the Students table
    cy.task(
      "queryDb",
      "CREATE TABLE Students(StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))"
    );
  });

  afterEach(() => {
    // After each test, drop the Students table
    cy.task("queryDb", "DROP TABLE Students");
  });

  it('Can connect to the database', () => {
    // Check if the Students table exists
    cy.task("queryDb", "SHOW TABLES LIKE 'Students'")
      .then((result) => {
        expect(result.length).to.equal(1); // Expect one table to be found
      });
  });

  it("Insert entries", () => {
    // Insert entries into the Students table
    cy.task("queryDb",
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
      (1, 'John', 'Spring-2024', 'New York'),
      (2, 'Emma', 'Spring-2024', 'Los Angeles'),
      (3, 'Michael', 'Spring-2024', 'Chicago'),
      (4, 'Sophia', 'Spring-2024', 'Houston'),
      (5, 'William', 'Spring-2024', 'Phoenix');`
    ).then(() => {
      // Check if five entries were inserted
      cy.task("queryDb", "SELECT COUNT(*) AS count FROM Students")
        .then((result) => {
          expect(result[0].count).to.equal(5); // Expect the count to be 5
        });
    });
  });

  it('Can fetch all students from the group', () => {
    // Select all students from the 'Spring-2024' group
    cy.task('queryDb', 'SELECT * FROM Students WHERE StudentGroup = "Spring-2024"')
      .then((result) => {
        // Expect at least one record to be returned
        expect(result.length).to.be.greaterThan(0);
      });
  });
});
