#!/usr/bin/env bash
# Command: db-migrate
# Description: Runs database migrations. Must be append-only.
echo "Running append-only database migrations..."
# In a real scenario, this would call `alembic upgrade head`
echo "Migrations applied."
