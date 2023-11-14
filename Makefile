build:
	docker build -f "Dockerfile" -t demo .

run:
	docker run --name democontainer -d -p 3000:3000 demo

delete:
	docker stop democontainer
	docker rm democontainer

test-local-e2e:
	npx cypress run

test-local-component:
	npx cypress run --component

test-component:
	docker run -it -v "$(CURDIR):/e2e" -w /e2e cypress/included:13.3.0 --component

test-e2e:
	docker run -it -v "$(CURDIR):/e2e" -w /e2e cypress/included:13.3.0 open

tabs:
	echo "Asegurarse que esta corriendo el back y el front"
	echo "Instalar puppeteer: npm install puppeteer"
	node scripts/open4Tabs.js $(ARGS)