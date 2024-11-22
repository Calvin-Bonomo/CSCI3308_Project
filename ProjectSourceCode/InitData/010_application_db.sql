--table for each unique job application 
CREATE TABLE IF NOT EXISTS application (
    application_id SERIAL PRIMARY KEY,
    employer VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    application_date DATE DEFAULT CURRENT_DATE,
    salary NUMERIC(15, 2),
    application_status VARCHAR(100) NOT NULL,
    interview_rounds INTEGER DEFAULT 0
);
