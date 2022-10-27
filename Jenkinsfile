pipeline {
       environment {
        frontend = "bynet_app2"
        backend = "bynet_server2"
        dockerfileFront = "./Frontend"
        dockerfileBack = "./Backend"
        registryCredential = 'docker-cred'
    }
    agent any 
    triggers {
    githubPush()
    }
    stages {
          stage('Clone git') {
            steps {
                git url: 'https://github.com/israeliwarrior/Docker-Project.git', branch: 'main'
            }
        }
          stage('Building the front image') {
            steps{
                script {
                    frontImage = docker.build(frontend + ":latest",
                    "-f ${dockerfileFront}/Dockerfile  ${dockerfileFront}"
                    )
                }
            }
        }
        
         stage('Building the backend image') {
            steps{
                script {
                    backImage = docker.build(backend + ":latest",
                    "-f ${dockerfileBack}/Dockerfile  ${dockerfileBack}"
                    )
                }
            }
        }

               stage('Deploing Image to dockerhub') {
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        frontImage.push();
                        backImage.push()
                    }
    }

}
               }
    }
}
