// This shows a simple example of how to archive the build output artifacts.
pipeline {
    agent any
    stages {
        stage ('Starting the webpage') {
            steps {
                sh "python3 -V"
                sh "apt install python3-pip"
                sh "pip version pywebcopy"
                sh "python3 Versiones.py"
            }
        }

    }
}