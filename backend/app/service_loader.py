import json
import os
from pathlib import Path

from app.models import ServiceDefinition, ServicesFile


def services_file_path() -> Path:
    return Path(os.getenv("SERVICES_FILE", "services.json"))


def load_services(path: Path | None = None) -> list[ServiceDefinition]:
    target = path or services_file_path()

    with target.open("r", encoding="utf-8") as file:
        payload = json.load(file)

    return ServicesFile.model_validate(payload).services
