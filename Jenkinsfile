pipeline {
    agent any

    tools {
        nodejs "node"
    }

    environment {
        CI = 'true'
        NODE_ENV = 'production'
        PORT = '3016'
        NEXT_DISABLE_TURBOPACK = '1'
        DISCORD_WEBHOOK = credentials('pytripwebhook')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Clonage du repo PyTrip"
                git branch: 'main',
                    url: 'https://github.com/studentmovi/PyTrip.git'
            }
        }

        stage('Install dependencies (dev)') {
            steps {
                echo "📦 Installation des dépendances (dev inclus)"
                sh 'npm ci'
            }
        }

        stage('Build Next.js') {
            steps {
                echo "🏗️ Build du site PyTrip"
                sh '''
                    export PORT=$PORT
                    npm run build
                '''
            }
        }

        stage('Archive build output') {
            steps {
                archiveArtifacts artifacts: '.next/**', fingerprint: true
            }
        }

        stage('Install dependencies (prod only)') {
            steps {
                echo "📦 Installation des dépendances PROD only"
                sh '''
                    rm -rf node_modules
                    npm ci --omit=dev
                '''
            }
        }

        stage('Deploy & Run with PM2') {
            steps {
                echo "🚀 Lancement de PyTrip via PM2"
                sh '''
                    cd "$WORKSPACE"

                    export PORT=$PORT
                    export NODE_ENV=production

                    pm2 delete pytrip || true
                    pm2 start npm --name "pytrip" -- run start
                    pm2 save
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
              \\"username\\": \\"PyTrip Deploy\\",
              \\"avatar_url\\": \\"https://www.jenkins.io/images/logos/jenkins/jenkins.png\\",
              \\"embeds\\": [{
                \\"title\\": \\"✅ Déploiement réussi\\",
                \\"description\\": \\"**PyTrip** est en ligne 🚀\\",
                \\"color\\": 5763719,
                \\"fields\\": [
                  { \\"name\\": \\"🌐 Port\\", \\"value\\": \\"$PORT\\", \\"inline\\": true },
                  { \\"name\\": \\"🌿 Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"🔗 Jenkins\\", \\"value\\": \\"[Voir le build]($BUILD_URL)\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins • PyTrip CI\\" },
                \\"timestamp\\": \\"$TIMESTAMP\\"}]
            }" "$DISCORD_WEBHOOK"
            '''
        }

        failure {
            sh '''
            TIMESTAMP=$(date -Iseconds)
            curl -X POST -H "Content-Type: application/json" \
            -d "{
              \\"username\\": \\"PyTrip Deploy\\",
              \\"avatar_url\\": \\"https://www.jenkins.io/images/logos/jenkins/jenkins.png\\",
              \\"embeds\\": [{
                \\"title\\": \\"❌ Déploiement échoué\\",
                \\"description\\": \\"Le déploiement de **PyTrip** a échoué 😬\\",
                \\"color\\": 15548997,
                \\"fields\\": [
                  { \\"name\\": \\"🌿 Branch\\", \\"value\\": \\"main\\", \\"inline\\": true },
                  { \\"name\\": \\"🔗 Jenkins\\", \\"value\\": \\"[Voir les logs]($BUILD_URL)\\", \\"inline\\": false }
                ],
                \\"footer\\": { \\"text\\": \\"Jenkins • PyTrip CI\\" },
                \\"timestamp\\": \\"$TIMESTAMP\\"}]
            }" "$DISCORD_WEBHOOK"
            '''
        }
    }
}
