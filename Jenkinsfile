pipeline {
       environment {
        frontend = "israeliwarrior/docker-project/Fronend"
        backend = "israeliwarrior/docker-project/Backend"
        dockerfileFront = "./Fronend"
        dockerfileBack = "./Backend"
        registryCredential = 'Docker'
        // dockerImage = ''
    }
    agent any 
    stages {
          stage('Cloning Git') {
            steps {
                git 'https://github.com/israeliwarrior/Docker-Project.git'
            }
        }
          stage('Building image Front') {
            steps{
                script {
                    frontImage = docker.build(frontend + ":latest",
                    "-f ${dockerfileFront}/Dockerfile  ${dockerfileFront}"
                    )
                }
            }
        }
        
         stage('Building image Back') {
            steps{
                script {
                    backImage = docker.build(backend + ":latest",
                    "-f ${dockerfileBack}/Dockerfile  ${dockerfileBack}"
                    )
                }
            }
        }

               stage('Deploy Image') {
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
