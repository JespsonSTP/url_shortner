#! /usr/bin/groovy
pipeline {
    agent any
    stages {
        stage('Unit-testing'){
            steps{
                script {
                    app = docker.build("jespstpierre/urlshortner")
                    app.inside{
                        sh '''#!/bin/bash
                            echo "hello world"
                            pip3 install --no-cache-dir -r ./app/requirements.txt
                            py.test --verbose --junit-xml test-reports/pytest-results.xml
                        '''
                    }
                }
            }
        }
    }
}
