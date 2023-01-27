package com.sportsbox

import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context;
import android.content.Intent
import android.os.Build
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import com.sportsbox.ui.MainActivity
import com.sportsbox.utils.Logger


const val channelId = "notification_channel"
const val channelName = "com.sportsbox.appSettings"

class AppMessagingService() : FirebaseMessagingService(){


    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        if (remoteMessage.getNotification() != null) {
            Logger.debug("Remote Message", remoteMessage.toString())
            Logger.info("Title", remoteMessage.notification!!.title!!)
            Logger.info("Data", remoteMessage.notification!!.body!!)
            generateNotification(remoteMessage.notification!!.title!!,remoteMessage.notification!!.body!!)
            Logger.info("Device model", Build.MODEL)
        }
    }

    @Override
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Logger.info("FIREBASE_TOKEN", token);
    }

    @SuppressLint("RemoteViewLayout")
    fun getRemoteView(title: String, message: String): RemoteViews {
        val remoteView = RemoteViews(packageName, R.layout.notification)

        remoteView.setTextViewText(R.id.title, title)
        remoteView.setTextViewText(R.id.message, message)
        remoteView.setImageViewResource(R.id.app_logo, R.drawable.ic_launcher_foreground)

        return remoteView
    }

    fun generateNotification(title: String, message: String) {

        val intent = Intent(this, MainActivity::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)

        val pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT)

        var builder: NotificationCompat.Builder = NotificationCompat.Builder(applicationContext, channelId)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setAutoCancel(true)
            .setVibrate(longArrayOf(1000, 1000, 1000, 1000))
            .setOnlyAlertOnce(true)
            .setContentIntent(pendingIntent)

        builder = builder.setContent(getRemoteView(title, message))

        val notifcationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notifcationChannel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_HIGH)
            notifcationManager.createNotificationChannel(notifcationChannel)
        }

        notifcationManager.notify(0, builder.build())
    }

}