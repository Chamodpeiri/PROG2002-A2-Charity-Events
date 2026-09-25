CREATE DATABASE charityevents_db;
USE charityevents_db;

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(150) NOT NULL,
    category_id INT,
    organisation VARCHAR(150),
    purpose VARCHAR(255),
    ticket_price DECIMAL(10,2),
    goal_amount DECIMAL(10,2),
    raised_amount DECIMAL(10,2),
    status VARCHAR(50),
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (category_name) VALUES
('Fun Run'),
('Gala Dinner'),
('Auction'),
('Concert');

SELECT * FROM categories;


INSERT INTO events
(event_name, description, event_date, event_time, location, category_id, organisation, purpose, ticket_price, goal_amount, raised_amount, status, image)
VALUES

('City Charity Fun Run',
 'A community fun run to raise funds for children in need.',
 '2026-10-10',
 '08:00:00',
 'Colombo',
 1,
 'Helping Hands Charity',
 'Support children education programs',
 20.00,
 10000.00,
 4500.00,
 'upcoming',
 'funrun.jpg'),

('Hope Gala Dinner',
 'An evening fundraising dinner supporting local families.',
 '2026-10-20',
 '18:30:00',
 'Colombo',
 2,
 'Hope Foundation',
 'Support low-income families',
 50.00,
 20000.00,
 12000.00,
 'upcoming',
 'gala.jpg'),

('Animal Rescue Auction',
 'A charity auction to support rescued animals.',
 '2026-11-05',
 '17:00:00',
 'Galle',
 3,
 'Animal Care Sri Lanka',
 'Provide food and medical care for rescued animals',
 10.00,
 15000.00,
 6000.00,
 'upcoming',
 'auction.jpg'),

('Music for Education',
 'A live charity concert supporting school children.',
 '2026-11-15',
 '19:00:00',
 'Kandy',
 4,
 'Education First',
 'Provide school supplies and educational resources',
 25.00,
 18000.00,
 8000.00,
 'upcoming',
 'concert.jpg'),

('Community Fun Run',
 'A family-friendly running event for community health.',
 '2026-12-01',
 '07:30:00',
 'Galle',
 1,
 'Healthy Community Foundation',
 'Raise funds for community health programs',
 15.00,
 12000.00,
 3000.00,
 'upcoming',
 'communityrun.jpg'),

('Children Charity Gala',
 'A fundraising dinner supporting children healthcare.',
 '2026-12-12',
 '18:00:00',
 'Kandy',
 2,
 'Children First Foundation',
 'Support children healthcare services',
 45.00,
 25000.00,
 14000.00,
 'upcoming',
 'childrengala.jpg'),

('Art for Hope Auction',
 'An art auction raising money for disaster relief.',
 '2027-01-15',
 '16:00:00',
 'Colombo',
 3,
 'Hope Relief Organisation',
 'Provide emergency disaster assistance',
 5.00,
 30000.00,
 9000.00,
 'upcoming',
 'artauction.jpg'),

('Charity Music Night',
 'A charity music event supporting elderly care.',
 '2027-02-10',
 '19:30:00',
 'Colombo',
 4,
 'Care for Seniors',
 'Support elderly care facilities',
 30.00,
 22000.00,
 7000.00,
 'upcoming',
 'musicnight.jpg');

 SELECT * FROM events;