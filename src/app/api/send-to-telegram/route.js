import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';

export async function POST(request) {
	try {
		// Конфігурація Telegram
		const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
		const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

		if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
			return NextResponse.json(
				{ message: 'Не налаштовані параметри Telegram бота' },
				{ status: 500 }
			);
		}

		// Отримуємо FormData безпосередньо з запиту
		const formData = await request.formData();

		// Витягуємо дані з форми
		const lastName = formData.get('lastName');
		const firstName = formData.get('firstName');
		const phone = formData.get('phone');
		const email = formData.get('email');
		const comment = formData.get('comment');
		const file = formData.get('file');

		// Формуємо текст повідомлення
		let messageText = `🔔 Нова заявка з сайту:\n\n`;
		messageText += `🧸 Користувач: ${lastName} ${firstName}\n`;
		messageText += `☎️ Телефон: ${phone}\n`;
		messageText += `✉️ Email: ${email}\n`;

		if (comment) {
			messageText += `💬 Коментар: ${comment}\n`;
		}

		// Надсилаємо текстове повідомлення
		const messageResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: TELEGRAM_CHAT_ID,
				text: messageText,
				parse_mode: 'HTML',
			}),
		});

		if (!messageResponse.ok) {
			throw new Error(`Помилка при надсиланні повідомлення в Telegram: ${messageResponse.status}`);
		}

		// Якщо є файл, відправляємо його окремим повідомленням
		if (file && file.size > 0) {
			// Конвертуємо файл у буфер
			const fileBuffer = Buffer.from(await file.arrayBuffer());
			const filename = file.name || 'attachment';

			// Створюємо нову FormData для відправки файлу
			const telegramFormData = new FormData();
			telegramFormData.append('chat_id', TELEGRAM_CHAT_ID);
			telegramFormData.append('document', fileBuffer, {
				filename: filename,
				contentType: file.type,
			});
			telegramFormData.append('caption', `📎 Файл від ${firstName} ${lastName}`);

			const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
				method: 'POST',
				body: telegramFormData,
			});

			if (!fileResponse.ok) {
				throw new Error(`Помилка при надсиланні файлу в Telegram: ${fileResponse.status}`);
			}
		}

		return NextResponse.json({ message: 'Повідомлення успішно надіслано' });
	} catch (error) {
		console.error('Помилка при надсиланні повідомлення в Telegram:', error);
		return NextResponse.json(
			{ message: 'Помилка при обробці форми', error: error.message },
			{ status: 500 }
		);
	}
}