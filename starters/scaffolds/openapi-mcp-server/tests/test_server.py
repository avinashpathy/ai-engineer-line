from app.server import ping


def test_ping():
    assert ping() == "pong"
