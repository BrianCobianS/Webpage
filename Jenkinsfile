// This shows a simple example of how to archive the build output artifacts.
pipeline {
    agent any
    stages {
        stage ('Starting the webpage') {
            steps {
                // sh "wget http://10.89.110.62:28081/service/rest/repository/browse/tgcs-maven-snapshot/com/toshibacommerce/ace/ACE3D001/"
                sh "x='str(index.html)'"
                sh "echo $x"
                sh "echo 'changeBat(x)' >> Versiones.py"
                sh "ls"
                sh "python3 Versiones.py"
                sh "ls"
            }
        }

    }
}