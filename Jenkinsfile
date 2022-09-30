// This shows a simple example of how to archive the build output artifacts.
pipeline {
    agent any
    stages {
        stage ('Starting the webpage') {
            steps {
                // sh "wget http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/"
                sh"if [ -f/Desktop/index.html ];  "
                sh"then"
                sh"echo 'Si existe'"
                sh"else"
                sh"echo 'No EXISTE'"
                sh"fi"
                sh "echo '$Funcion' >> Versiones.py"
                sh "ls"
                sh "python3 Versiones.py"
                sh "ls"
            }
        }

    }
}