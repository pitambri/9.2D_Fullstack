pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS 18'
        PATH = "$NODEJS_HOME/bin:/usr/local/bin:$PATH"
        DOCKER_IMAGE = "pitambri/9.2D_Fullstack"
        NEW_RELIC_API_KEY = credentials('new-relic-api-key')
        SONARQUBE_TOKEN = credentials('sonarqube-token')  // Fetching from Jenkins credentials store
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/pitambri/9.2D_Fullstack.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Use 'npm ci' for faster, more reliable installs
            }
        }

        stage('Build') {
            steps {
                sh '''
                    npm run build
                    docker build -t $DOCKER_IMAGE:latest .
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    npm test -- --ci --runInBand
                '''
            }
        }

        stage('Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner -Dsonar.projectKey=9.2D_Fullstack \
                                      -Dsonar.sources=src \
                                      -Dsonar.host.url=http://sonarqube:9000 \
                                      -Dsonar.login=$SONARQUBE_TOKEN
                    '''
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                sh '''
                    docker run -d --rm --name test_app -p 8080:3000 $DOCKER_IMAGE:latest
                '''
            }
        }

        stage('Release to Production') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                    sh '''
                        docker tag $DOCKER_IMAGE:latest $DOCKER_IMAGE:prod
                        docker push $DOCKER_IMAGE:prod
                    '''
                }
            }
        }

        stage('Monitoring & Alerting') {
            steps {
                script {
                    if (NEW_RELIC_API_KEY?.trim()) {
                        sh '''
                            curl -X POST "https://api.newrelic.com/v2/alerts_events.json" \
                                 -H "X-Api-Key:$NEW_RELIC_API_KEY" \
                                 -d @alert-config.json
                        '''
                    } else {
                        echo "⚠️ Skipping New Relic Alerting - API key is missing!"
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker stop test_app || true'  // Stop test container if running
            }
            sh 'cat output.log || true'  // Show logs in Jenkins console
        }
        success {
            echo "✅ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed! Check logs."
        }
    }
}
