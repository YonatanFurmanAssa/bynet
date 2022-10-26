pipeline {
       environment {
        frontend = "yonatanfurmandocker/testing/fronend"
        backend = "yonatanfurmandocker/testing/backend"
        dockerfileFront = "./Fronend"
        dockerfileBack = "./Backend"
        registryCredential = 'Docker'
        // dockerImage = ''
    }
    agent any 
    triggers {
    githubPush()
    }
    stages {
          stage('Cloning Git') {
            steps {
                git url: 'https://github.com/israeliwarrior/Docker-Project.git', branch: 'main'
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
