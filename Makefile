build:
	docker build -f "Dockerfile" -t demo .

run:
	docker run --name democontainer -d -p 3000:3000 demo

delete:
	docker stop democontainer
	docker rm democontainer
	