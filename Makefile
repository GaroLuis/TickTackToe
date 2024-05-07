s=app
u=node

.PHONY: bash
bash:
	docker-compose exec --user=${u} ${s} /bin/bash

.PHONY: ws
ws: ## Start ws server
	docker-compose exec --user=${u} ${s} sh -lc 'npm run build'

.PHONY: app
app: ## Start next app
	docker-compose exec --user=${u} ${s} sh -lc 'npm run dev'
