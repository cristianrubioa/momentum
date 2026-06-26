.PHONY: fix check test

fix:
	poetry run ruff format custom_components tests
	poetry run ruff check --fix custom_components tests

check:
	poetry run ruff format --check custom_components tests
	poetry run ruff check custom_components tests

test:
	poetry run pytest
