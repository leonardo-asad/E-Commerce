INSERT INTO product (name, description, url_image, quantity, price, date, active, user_id)
VALUES
  ('Apple iPhone SE', 'Fully functional, excellent cosmetic condition and set to factory defaults.  As these are pre-owned, these units may or may not have very minor and for the most part insignificant scratches from previous use.  Very beautiful units!  Unlocked.', 'images/phone01.webp', 1000, 155, '2022-11-15 09:39:49.866+13', true, 2),
  ('Apple iPhone 11', 'This product is in good cosmetic condition, there will be signs of wear which may include scratches, visible scuffs or screen discoloration but nothing that will impair functionality. Battery health will be a minimum of 80 percent. The item has been fully tested, restored to factory settings and is in excellent working order.', 'images/phone02.jpg', 1000, 830, '2022-11-15 09:39:49.866+13', true, 2),
  ('Fender Stratocaster', 'A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable). Packaging should be the same as what is found in a retail store, unless the item is handmade or was packaged by the manufacturer in non-retail packaging, such as an unprinted box or plastic bag.', 'images/guitar01.jpg', 1000, 744, '2022-11-15 09:39:49.866+13', true, 2),
  ('Table Set', 'The cozy, classic feel of a traditional village tavern inspired this 5-piece pub set. A design investment, it’s constructed with durable wood and features a rich brown finish for timeless versatility.', 'images/table_set01.jpg', 1000, 150, '2022-11-15 09:39:49.866+13', true, 2),
  ('Samsung 32-Inch QLED', 'Enjoy ultra-intense 4K vivid color and sharpened clarity with the Q60A/Q60AB. It combines Quantum Dot Technology with the power of 100 percent Color Volume¹ to deliver a billion of shades for colorful, razor-sharp visuals. The ultra-smart Quantum Processor 4K Lite automatically upscales and transforms your content into 4K. Dual LED² backlighting adjusts and coordinates with content in real time to enhance contrast and detail.', 'images/tv01.webp', 1000, 447, '2022-11-15 09:39:49.866+13', true, 2),
  ('6-Speed Mixer', 'Whip up an airy meringue or decadent cake with the Hamilton Beach hand mixer. This versatile mixer is your go-to appliance for mixing, whisking, and folding with 250W of peak power. A built-in bowl rest makes it easier to set the mixer down when adding ingredients. The mixer has six speeds, including quick burst functions for additional power at any speed. The Hamilton Beach hand mixer is not just about performance, it’s also designed for easy storage.', 'images/mixer01.jpg', 1000, 100, '2022-11-15 09:39:49.866+13', true, 2),
  ('Car Seat', 'Safely ride rear-facing longer! The Graco Extend2Fit Convertible Car Seat grows with your child from rear-facing harness (4-50 lbs) to forward-facing harness (22-65 lbs). It features a 4-position extension panel that provides up to 5” of extra rear-facing legroom, allowing your child to safely ride rear-facing longer.', 'images/car_seat01.jpg', 1000, 300, '2022-11-15 09:39:49.866+13', true, 2),
  ('Citizen BL5550', 'New item in original open box. Water-Resistant, Mineral Crystal, Luminous Hands, Date Indicator, Alarm, Perpetual Calendar, 12-Hour Dial, Chronograph', 'images/watch01.webp', 1000, 300, '2022-11-15 09:39:49.866+13', true, 2),
  ('Gold coins', 'This auction is for 3 Canadian Maple Leaf 1oz gold coins. The coins are in brand new condition.', 'images/coin01.png', 1000, 9980, '2022-11-15 09:39:49.866+13', true, 2),
  ('Reclining seat', 'Beautiful patch-work leather reclining antique chair.', 'images/seat01.jpg', 1000, 756, '2022-11-15 09:39:49.866+13', true, 2),
  ('Dressing Table', 'Solid oak duchess in good condition but does need a little bit of TLC.', 'images/wardrobe01.jpg', 1000, 377, '2022-11-15 09:39:49.866+13', true, 2),
  ('Oak Sideboard Buffet', 'Exceptionaly beautiful antique Edwardian Sideboard Buffet.', 'images/sideboard01.jpg', 1000, 641, '2022-11-15 09:39:49.866+13', true, 2),
  ('Crown Lynn Swans', '5 x Baby Swans (Crown Lynn) and 1 Mother swan (FREE) ', 'images/swans01.jpg', 1000, 502, '2022-11-15 09:39:49.866+13', true, 2),
  ('Mountain Buggy', 'Mountain Buggy Terrain (2019) - Onyx, including both the large and smaller (unused) wheels.', 'images/buggy01.jpg', 1000, 220, '2022-11-15 09:39:49.866+13', true, 2),
  ('HP Laptop 15.6" FHD', 'A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable).', 'images/laptop01.jpg', 1000, 1210, '2022-11-15 09:39:49.866+13', true, 2),
  ('Snoopy sweatshirt', 'Vintage Peanuts Snoopy Ski sweatshirt Heather Gray Sz S-M.', 'images/clothe01.jpg', 1000, 50, '2022-11-15 09:39:49.866+13', true, 2),
  ('Long Dress', 'A brand-new, unused, and unworn item (including handmade items) in the original packaging (such as the original box or bag) and/or with the original tags attached.', 'images/dress01.jpg', 1000, 320, '2022-11-15 09:39:49.866+13', true, 2),
  ('Inflatable Pool', 'A brand-new, unused, unopened, undamaged item in its original packaging (where packaging is applicable).', 'images/pool01.jpg', 1000, 190, '2022-11-15 09:39:49.866+13', true, 2);


INSERT INTO category (name, image_url)
VALUES
	('Antiques & Collectables', 'images/antiques_and_collectables.jpg'),
  ('Baby Gear', 'images/baby_gear.jpg'),
  ('Books', 'images/books.jpg'),
  ('Building & Renovation', 'images/building_and_renovation.jpg'),
  ('Business, farming & industry', 'images/farming.jpg'),
  ('Clothing & Fashion', 'images/clothes.webp'),
  ('Computers', 'images/computers.jpg'),
  ('Electronics & photography', 'images/photography.jpg'),
  ('Gaming', 'images/gaming.webp'),
  ('Health & Beauty', 'images/health.jpeg'),
  ('Home & living', 'images/home.webp'),
  ('Jewllery & watches', 'images/watches.jpeg'),
  ('Mobile phones', 'images/cellphones.jpg'),
  ('Music & instruments', 'images/musical_instruments.jpg'),
  ('Pets & animals', 'images/pets.jpeg'),
  ('Sports', 'images/sports.jpeg'),
  ('Toys & models', 'images/toys.jpeg');

INSERT INTO products_categories (product_name, category_name)
VALUES
  ('Apple iPhone SE', 'Mobile phones'),
  ('Apple iPhone 11', 'Mobile phones'),
  ('Fender Stratocaster', 'Music & instruments'),
  ('Table Set', 'Home & living'),
  ('Samsung 32-Inch QLED', 'Electronics & photography'),
  ('6-Speed Mixer', 'Home & living'),
  ('Car Seat', 'Baby Gear'),
  ('Citizen BL5550', 'Jewllery & watches'),
  ('Gold coins', 'Antiques & Collectables'),
  ('Reclining seat', 'Antiques & Collectables'),
  ('Dressing Table', 'Antiques & Collectables'),
  ('Oak Sideboard Buffet', 'Antiques & Collectables'),
  ('Crown Lynn Swans', 'Antiques & Collectables'),
  ('Mountain Buggy', 'Baby Gear'),
  ('HP Laptop 15.6" FHD', 'Computers'),
  ('Snoopy sweatshirt', 'Clothing & Fashion'),
  ('Long Dress', 'Clothing & Fashion'),
  ('Inflatable Pool', 'Home & living');
