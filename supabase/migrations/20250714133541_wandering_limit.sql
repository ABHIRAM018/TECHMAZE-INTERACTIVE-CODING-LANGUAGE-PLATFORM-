/*
  # Add Go Language Support

  1. Updates
    - Update language constraints to include 'Go'
    - Add Go resources to youtube_resources table
    - Add Go resources to notes_resources table

  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Update language constraints to include Go
ALTER TABLE youtube_resources DROP CONSTRAINT IF EXISTS youtube_resources_language_check;
ALTER TABLE youtube_resources ADD CONSTRAINT youtube_resources_language_check 
  CHECK ((language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text])));

ALTER TABLE notes_resources DROP CONSTRAINT IF EXISTS notes_resources_language_check;
ALTER TABLE notes_resources ADD CONSTRAINT notes_resources_language_check 
  CHECK ((language = ANY (ARRAY['Python'::text, 'C'::text, 'C++'::text, 'Go'::text])));

-- Insert Go YouTube resources
INSERT INTO youtube_resources (language, title, url) VALUES
('Go', 'Go Programming Complete Course', 'https://www.youtube.com/watch?v=YS4e4q9oBaU'),
('Go', 'Go Concurrency Patterns', 'https://www.youtube.com/watch?v=f6kdp27TYZs'),
('Go', 'Building Web APIs with Go', 'https://www.youtube.com/watch?v=SonwZ6MF5BE'),
('Go', 'Go Microservices Tutorial', 'https://www.youtube.com/watch?v=VzBGi_n65iU'),
('Go', 'Go Testing and Benchmarking', 'https://www.youtube.com/watch?v=ndmB0bj7eyw'),
('Go', 'Go Design Patterns', 'https://www.youtube.com/watch?v=tAuRQs_d9F8'),
('Go', 'Go Performance Optimization', 'https://www.youtube.com/watch?v=NS1hmEWv4Ac'),
('Go', 'Go Docker and Kubernetes', 'https://www.youtube.com/watch?v=XCsS_NVAa1g'),
('Go', 'Go gRPC Tutorial', 'https://www.youtube.com/watch?v=BdzYdN_Zd9Q'),
('Go', 'Go Database Programming', 'https://www.youtube.com/watch?v=p4Mu1PHhFdg');

-- Insert Go Notes resources
INSERT INTO notes_resources (language, title, url) VALUES
('Go', 'Go Official Documentation', 'https://golang.org/doc/'),
('Go', 'A Tour of Go', 'https://tour.golang.org/'),
('Go', 'Go by Example', 'https://gobyexample.com/'),
('Go', 'Effective Go', 'https://golang.org/doc/effective_go.html'),
('Go', 'Go Programming Language Specification', 'https://golang.org/ref/spec'),
('Go', 'Go Standard Library', 'https://pkg.go.dev/std'),
('Go', 'Go Wiki', 'https://github.com/golang/go/wiki'),
('Go', 'Go Code Review Comments', 'https://github.com/golang/go/wiki/CodeReviewComments'),
('Go', 'Go Memory Model', 'https://golang.org/ref/mem'),
('Go', 'Go FAQ', 'https://golang.org/doc/faq');