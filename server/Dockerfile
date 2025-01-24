# Use the official Python image from the Docker Hub
FROM python:3

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

RUN pip cache purge 
# Install the dependencies
RUN python -m pip install --default-timeout=1000 -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

EXPOSE 8000

# Specify the command to run the application
CMD ["uvicorn", "app:app", "--reload"]