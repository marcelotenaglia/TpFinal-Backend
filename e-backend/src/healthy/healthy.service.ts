import { Injectable } from '@nestjs/common';
import { CreateHealthyDto } from './dto/create-healthy.dto';
import { UpdateHealthyDto } from './dto/update-healthy.dto';

@Injectable()
export class HealthyService {
  create(createHealthyDto: CreateHealthyDto) {
    return 'This action adds a new healthy';
  }
   // Arreglo con mensajes divertidos en español
   private readonly mensajes: string[] = [
    '¡Todo en orden, seguimos adelante! 🚀',
    '¡Estoy funcionando de maravilla! 😎',
    '¡Vivo y coleando! 👾',
    'Todo bajo control... probablemente 🤖',
    '¡Beep boop! ¡Todos los sistemas en línea! 🤖',
    '¡Funcionando como una máquina bien engrasada! 🛠️',
    'Sin errores, solo felicidad 🐞✨',
    'Sirviendo felicidad en el puerto 3000 😊',
    '¡Aquí estoy, todo marcha bien! 🌟',
    '¡Listo para la acción! 💥',
    '¡Más rápido que tu Wi-Fi! 🏃💨',
    'Todo en su lugar, como por arte de magia 🧙‍♂️✨',
    '¡Despejado para despegar! 🛫',
    '¡Al 100%, sin margen de error! 🔋💯',
    'Corriendo como si no hubiera mañana! 🏃‍♂️'
  ];

  // Método para seleccionar un mensaje aleatorio
  checkHealth(): string {
    const indiceAleatorio = Math.floor(Math.random() * this.mensajes.length);
    return this.mensajes[indiceAleatorio];
  }


  

}
