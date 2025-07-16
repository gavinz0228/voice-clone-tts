# Use an official Python runtime as a parent image
FROM python:3.9-slim-bullseye

# Install build dependencies
RUN apt-get update && apt-get install -y     build-essential     cmake     libffi-dev     python3-dev     pkg-config     curl     && rm -rf /var/lib/apt/lists/*
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Set the working directory in the container
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Make port 5000 available to the world outside this container
EXPOSE 8001

# Run app.py when the container launches
CMD ["python", "app.py"]
