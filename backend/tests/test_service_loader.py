import json

from app.service_loader import load_services


def test_load_services_from_json(tmp_path):
    services_file = tmp_path / "services.json"
    services_file.write_text(
        json.dumps(
            {
                "services": [
                    {
                        "name": "API",
                        "url": "http://localhost:8000/health",
                        "port": 8000,
                        "description": "Backend",
                    }
                ]
            }
        ),
        encoding="utf-8",
    )

    services = load_services(services_file)

    assert len(services) == 1
    assert services[0].name == "API"
    assert services[0].port == 8000
