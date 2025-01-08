from app.models import db, Review, environment, SCHEMA
from sqlalchemy import text


def seed_reviews():
    review1 = Review(
        user_id=1,
        motorcycle_id=1,
        review_text='Great bike!',
        stars=5
    )

    review2 = Review(
        user_id=1,
        motorcycle_id=2,
        review_text='Good bike, but not great.',
        stars=3
    )

    review3 = Review(
        user_id=2,
        motorcycle_id=3,
        review_text='Love this bike!',
        stars=5
    )

    review4 = Review(
        user_id=3,
        motorcycle_id=1,
        review_text='Not impressed.',
        stars=2
    )

    review5 = Review(
        user_id=2,
        motorcycle_id=4,
        review_text='Decent bike.',
        stars=4
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()