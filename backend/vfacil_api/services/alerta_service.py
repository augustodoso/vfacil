from apscheduler.schedulers.background import BackgroundScheduler
import datetime

def enviar_alerta():
    print(f"[{datetime.datetime.now()}] Alerta: Verifique suas notas fiscais!")

def iniciar_agendador():
    scheduler = BackgroundScheduler()
    scheduler.add_job(enviar_alerta, 'interval', hours=24)
    scheduler.start()
