import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { fontFamilyOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { fontSizeOptions } from 'src/constants/articleProps';
import { fontColors } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { backgroundColors } from 'src/constants/articleProps';
import { contentWidthArr } from 'src/constants/articleProps';
import { ArticleStateType } from 'src/constants/articleProps';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	handleSubmit: (formState: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleArrowClick = () => {
		setIsOpen((isOpen) => !isOpen);
	};

	const handleFontFamilySelection = (selected: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selected });
	};

	const handleFontSizeSelection = (selected: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selected });
	};

	const handleFontColorSelection = (selected: OptionType) => {
		setFormState({ ...formState, fontColor: selected });
	};

	const handleBgColorSelection = (selected: OptionType) => {
		setFormState({ ...formState, backgroundColor: selected });
	};

	const handleContentWidthSelection = (selected: OptionType) => {
		setFormState({ ...formState, contentWidth: selected });
	};

	const handleClearButtonClick = () => {
		setFormState(defaultArticleState);
		props.handleSubmit(defaultArticleState);
	};

	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.handleSubmit(formState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilySelection}
						title='шрифт'
					/>
					<RadioGroup
						name='size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeSelection}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorSelection}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBgColorSelection}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthSelection}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClearButtonClick}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
