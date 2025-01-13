from app.models import db, Motorcycle, MotorcycleImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_motorcycles():
    motorcycle1 = Motorcycle(
        owner_id=1,
        year=2022,
        make='Honda',
        model='CBR500R',
        color='Red',
        price=95,
        miles=3500,
        city='San Francisco',
        state='CA',
        description='2022 Honda CBR500R with low miles.'
    )

    motorcycle2 = Motorcycle(
        owner_id=2,
        year=2021,
        make='Yamaha',
        model='R6',
        color='Blue',
        price=145,
        miles=2500,
        city='Los Angeles',
        state='CA',
        description='2021 Yamaha R6 with very low miles.'
    )

    motorcycle3 = Motorcycle(
        owner_id=3,
        year=2020,
        make='Kawasaki',
        model='Ninja 400',
        color='Green',
        price=70,
        miles=8200,
        city='San Diego',
        state='CA',
        description='2020 Kawasaki Ninja 400 with good condition.'
    )

    motorcycle4 = Motorcycle(
        owner_id=1,
        year=2019,
        make='Suzuki',
        model='GSX-R750',
        color='Black',
        price=125,
        miles=6600,
        city='San Jose',
        state='CA',
        description='2019 Suzuki GSX-R750 with average miles.'
    )

    motorcycle5 = Motorcycle(
        owner_id=2,
        year=2018,
        make='Ducati',
        model='Panigale V4',
        color='Red',
        price=205,
        miles=1300,
        city='New York',
        state='NY',
        description='2018 Ducati Panigale V4 with low miles.'
    )

    motorcycle6 = Motorcycle(
        owner_id=3,
        year=2017,
        make='BMW',
        model='S1000RR',
        color='Blue',
        price=175,
        miles=7300,
        city='Chicago',
        state='IL',
        description='2017 BMW S1000RR with good condition.'
    )

    db.session.add(motorcycle1)
    db.session.add(motorcycle2)
    db.session.add(motorcycle3)
    db.session.add(motorcycle4)
    db.session.add(motorcycle5)
    db.session.add(motorcycle6)

    db.session.commit()

    images_data = [
        MotorcycleImage(motorcycle_id=1, image_url='/images/cbr500r-red-cap.jpg'),
        MotorcycleImage(motorcycle_id=1, image_url='https://example.com/motorcycle1-2.jpg'),
        MotorcycleImage(motorcycle_id=2, image_url='/images/r6-blue-cap.jpg'),
        MotorcycleImage(motorcycle_id=3, image_url='/images/ninja-green.jpg'),
        MotorcycleImage(motorcycle_id=4, image_url='/images/gsx-r750-white-red.jpg'),
        MotorcycleImage(motorcycle_id=5, image_url='/images/panigale-v4-red.jpg'),
        MotorcycleImage(motorcycle_id=6, image_url='/images/s1000rr-red.jpg'),
        MotorcycleImage(motorcycle_id=1, image_url='https://example.com/motorcycle1-3.jpg'),
        MotorcycleImage(motorcycle_id=2, image_url='https://example.com/motorcycle2-2.jpg'),
        MotorcycleImage(motorcycle_id=3, image_url='https://example.com/motorcycle3-2.jpg'),
    ]

    db.session.bulk_save_objects(images_data)
    db.session.commit()


def undo_motorcycles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.motorcycles RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.motorcycle_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM motorcycles"))
        db.session.execute(text("DELETE FROM motorcycle_images"))

    db.session.commit()