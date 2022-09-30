// This shows a simple example of how to archive the build output artifacts.
pipeline {
    agent any
    stages {
        stage ('Starting the webpage') {
            steps {
                sh"if [ -f/index.html ]; then rm index.html;else echo 'No, no existe'; fi"
                sh "wget http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/"
                sh "echo '$Funcion' >> Versiones.py"
                sh "ls"
                sh "python3 Versiones.py"
                sh "ls"
            }
        }

    }
}