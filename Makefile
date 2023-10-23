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
