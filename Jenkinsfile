pipeline {
    agent any

    options {
        skipDefaultCheckout()
    }

    environment {
        CI = 'true'
        NODE_ENV = "production"
        DISCORD_WEBHOOK = credentials('discord-webhook')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Clonage du repo PyTrip (Next.js)"
                git branch: 'main',
                    url: 'https://github.com/studentmovi/PyTrip.git'
            }
        }

        stage('Node version') {
            steps {
                sh '''
                echo "🧠 Node & npm versions"
                node -v
                npm -v
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                echo "📦 Installation des dépendances (prod only)"
                sh '''
                npm ci
                '''
            }
        }

        stage('Build Next.js') {
            steps {
                echo "🏗️ Build du site Next.js"
                sh '''
                npm run build
                '''
            }
        }
    }

    post {

        success {
            sh '''
            TIMESTAMP=$(date -Iseconds)
            curl -X POST -H "Content-Type: application/json" \
            -d "{
              \\"username\\": \\"Jenkins CI\\",
              \\"avatar_url\\": \\"https://www.jenkins.io/images/logos/jenkins/jenkins.png\\",
              \\"embeds\\": [{
                \\"title\\": \\"✅ Build réussi\\",
                \\"description\\": \\"Le build **PyTrip** s’est terminé avec succès.\\",
                \\"color\\": 5763719,
                \\"fields\\": [
                  { \\"name\\": \\"📦 Repository\\", \\"value\\": \\"studentmovi/PyTrip\\", \\"inline\\": true },
                  { \\"name\\": \\"🌿 Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"🚀 Status\\", \\"value\\": \\"SUCCESS\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins • PyTrip CI\\" },
                \\"timestamp\\": \\"$TIMESTAMP\\"
              }]
            }" "$DISCORD_WEBHOOK"
            '''
        }

        failure {
            sh '''
            TIMESTAMP=$(date -Iseconds)
            curl -X POST -H "Content-Type: application/json" \
            -d "{
              \\"username\\": \\"Jenkins CI\\",
              \\"avatar_url\\": \\"https://www.jenkins.io/images/logos/jenkins/jenkins.png\\",
              \\"embeds\\": [{
                \\"title\\": \\"❌ Build échoué\\",
                \\"description\\": \\"Le build **PyTrip** a échoué. Va jeter un œil aux logs Jenkins 👀\\",
                \\"color\\": 15548997,
                \\"fields\\": [
                  { \\"name\\": \\"📦 Repository\\", \\"value\\": \\"studentmovi/PyTrip\\", \\"inline\\": true },
                  { \\"name\\": \\"🌿 Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"💥 Status\\", \\"value\\": \\"FAILURE\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins • PyTrip CI\\" },
                \\"timestamp\\": \\"$TIMESTAMP\\"
              }]
            }" "$DISCORD_WEBHOOK"
            '''
        }
    }
}
