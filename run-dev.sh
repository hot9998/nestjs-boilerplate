function up() {
    docker-compose -f docker/docker-compose-dev.yml up --build
}

function down() {
    docker-compose -f docker/docker-compose-dev.yml down
}

MODE=$1

if [ "${MODE}" == "up" ]; then
  up
elif [ "${MODE}" == "down" ]; then
  down
else
  echo "ERROR: The \"up\" or \"down\" command must be in the parameter."
  exit 1
fi