This project is now designed to run in docker
to build and run the project make sure you have docker installed

For the backend
docker build -t tmack .

docker run -t tmack


For the frontend
docker run -it --rm -d -p 8080:80 --name web -v /frontend nginx
